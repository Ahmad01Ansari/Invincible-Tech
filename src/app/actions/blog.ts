"use server";

import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().min(1, "Description is required"),
  content: z.any(),
  coverImage: z.string().optional(), // Allow optional for diagnostics if needed
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  author: z.string().min(1, "Author is required"),
  status: z.enum(["draft", "published"]).default("draft"),
  isFeatured: z.boolean().default(false),
  views: z.number().default(0).optional(),
  likesCount: z.number().default(0).optional(),
  sharesCount: z.number().default(0).optional(),
  bookmarksCount: z.number().default(0).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

/**
 * Security Middleware for Server Actions
 */
async function verifySession() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("ACCESS_DENIED: UNAUTHORIZED_TRANSMISSION");
  }
  return true; // Return a simple boolean instead of the session object
}

export async function createBlog(data: any) {
  try {
    // Sanitize input to prevent serialization issues with proxied objects
    const sanitizedData = JSON.parse(JSON.stringify(data));

    // Diagnostic: Inspect payload for image nodes
    const payloadStr = JSON.stringify(sanitizedData.content);
    console.log("SERVER_PAYLOAD_CHECK (Assets Present?):", 
      payloadStr.includes('"type":"technicalAsset"') || payloadStr.includes('"type":"image"')
    );
    
    await verifySession();
    await dbConnect();
    
    const validatedData = blogSchema.parse(sanitizedData);

    // Deep JSON Repair: Scan for 'technicalAsset' or 'image' nodes and ensure attrs.src exists
    if (validatedData.content && validatedData.content.content) {
      const repairNodes = (nodes: any[]) => {
        return nodes.map(node => {
          const isImageNode = node.type === 'technicalAsset' || node.type === 'image';
          if (isImageNode && !node.attrs?.src) {
             // Self-Healing Strategy: Check for hidden/escaped src attributes
             const backupSrc = node.attrs?.['data-src'] || node.attrs?.data_src || node.attrs?.['xlink:href'];
             if (backupSrc) {
                console.log(`📡 REPAIR_LOG: Self-Healed ${node.type} from backup source.`);
                node.attrs.src = backupSrc;
             } else {
                console.log(`📡 REPAIR_LOG: Deleting empty ${node.type} node. FULL_NODE:`, JSON.stringify(node));
                return null;
             }
          }
          if (isImageNode && node.attrs?.src) {
             console.log(`📡 REPAIR_LOG: Preserving ${node.type} node with asset identity.`);
          }
          if (node.content && Array.isArray(node.content)) {
            node.content = repairNodes(node.content);
          }
          return node;
        }).filter(Boolean);
      };
      
      validatedData.content.content = repairNodes(validatedData.content.content);
    }
    
    const newBlog = await Blog.create({
      ...validatedData,
      publishedAt: validatedData.status === "published" ? new Date() : null,
    });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    revalidatePath(`/blog/${newBlog.slug}`);
    
    return { success: true };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const errorMsg = error.issues.map((issue: any) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
      return { success: false, error: `Validation Failed: ${errorMsg}` };
    }
    console.error("Create Blog Error:", error.message);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}

export async function getBlogs(options: { 
  filter?: any, 
  sort?: any, 
  limit?: number 
} = {}) {
  try {
    await dbConnect();
    const { filter = {}, sort = { createdAt: -1 }, limit = 0 } = options;
    const blogs = await Blog.find(filter).sort(sort).limit(limit);
    return { success: true, data: JSON.parse(JSON.stringify(blogs)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function incrementView(slug: string) {
  try {
    await dbConnect();
    await Blog.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
    return { success: true };
  } catch (error: any) {
    console.error("Increment View Error:", error.message);
    return { success: false, error: error.message };
  }
}

export async function getBlogById(id: string) {
  try {
    await dbConnect();
    const blog = await Blog.findById(id);
    if (!blog) return { success: false, error: "Blog not found" };
    return { success: true, data: JSON.parse(JSON.stringify(blog)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug });
    if (!blog) return { success: false, error: "Blog not found" };
    return { success: true, data: JSON.parse(JSON.stringify(blog)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateBlog(id: string, data: any) {
  try {
    // Sanitize input to prevent serialization issues with proxied objects
    const sanitizedData = JSON.parse(JSON.stringify(data));

    await verifySession();
    await dbConnect();
    
    const validatedData = blogSchema.partial().parse(sanitizedData);
    
    const updateData: any = { ...validatedData };
    if (validatedData.status === "published") {
      updateData.publishedAt = new Date();
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedBlog) return { success: false, error: "Blog not found" };
    
    revalidatePath("/blog");
    revalidatePath(`/blog/${updatedBlog.slug}`);
    revalidatePath("/admin/blog");

    return { success: true };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const errorMsg = error.issues.map((issue: any) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
      return { success: false, error: `Validation Failed: ${errorMsg}` };
    }
    return { success: false, error: error.message || "Update failed" };
  }
}

export async function deleteBlog(id: string) {
  try {
    await verifySession();
    await dbConnect();
    
    await Blog.findByIdAndDelete(id);
    
    revalidatePath("/blog");
    revalidatePath("/admin/blog");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Diagnostic Activity: Persistence Peek
 * Checks the last saved blog post for image attribute presence.
 */
export async function checkLastPostPersistence() {
  try {
    await dbConnect();
    const latest = await Blog.findOne({}).sort({ createdAt: -1 });
    if (!latest) return { success: false, error: "Zero assets detected in aligned database." };
    
    const contentStr = JSON.stringify(latest.content);
    const hasTechnicalAsset = contentStr.includes('"type":"technicalAsset"');
    const hasStandardImage = contentStr.includes('"type":"image"');
    const imageAttrs = contentStr.match(/"type":"(technicalAsset|image)","attrs":(\{.*?\})/);

    return { 
      success: true, 
      title: latest.title,
      database: "invinsibleblog", // Aligned
      hasTechnicalAsset,
      hasStandardImage,
      rawAttrs: imageAttrs ? JSON.parse(imageAttrs[2]) : "None Found",
      isHardened: hasTechnicalAsset && !!imageAttrs
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

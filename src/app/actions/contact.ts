"use server";

import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Public Submission Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  country: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  sourcePage: z.string().default("/"),
});

/**
 * Security Middleware for Server Actions
 */
async function verifySession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("UNAUTHORIZED_ACCESS: SYSTEM_LOCKED");
  }
  return session;
}

/**
 * Create a new lead submission (Public)
 */
export async function createSubmission(data: any) {
  try {
    await dbConnect();
    const validatedData = contactSchema.parse(data);

    const submission = await Contact.create({
      ...validatedData,
      status: "new",
      notes: [],
    });

    revalidatePath("/admin/contact");
    return { success: true, id: submission._id.toString() };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: error.message || "Failed to log transmission" };
  }
}

/**
 * Get all submissions (Admin)
 */
export async function getSubmissions(options: { 
  filter?: any, 
  sort?: any, 
  limit?: number 
} = {}) {
  try {
    await verifySession();
    await dbConnect();
    
    const { filter = {}, sort = { createdAt: -1 }, limit = 0 } = options;
    const submissions = await Contact.find(filter).sort(sort).limit(limit);
    
    return { success: true, data: JSON.parse(JSON.stringify(submissions)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Get single submission details (Admin)
 */
export async function getSubmissionById(id: string) {
  try {
    await verifySession();
    await dbConnect();
    
    const submission = await Contact.findById(id);
    if (!submission) return { success: false, error: "Submission not found" };
    
    return { success: true, data: JSON.parse(JSON.stringify(submission)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Update submission status (Admin)
 */
export async function updateSubmissionStatus(id: string, status: string) {
  try {
    const session = await verifySession();
    await dbConnect();
    
    const updated = await Contact.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!updated) return { success: false, error: "Inquiry identity not found" };
    
    revalidatePath("/admin/contact");
    revalidatePath(`/admin/contact/${id}`);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Add internal note to submission (Admin)
 */
export async function addInternalNote(id: string, text: string) {
  try {
    const session = await verifySession();
    await dbConnect();
    
    const author = session.user?.name || "System Operator";
    
    const updated = await Contact.findByIdAndUpdate(
      id,
      { 
        $push: { 
          notes: { text, author, createdAt: new Date() } 
        } 
      },
      { new: true }
    );

    if (!updated) return { success: false, error: "Target inquiry lost" };
    
    revalidatePath(`/admin/contact/${id}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Delete submission record (Admin)
 */
export async function deleteSubmission(id: string) {
  try {
    await verifySession();
    await dbConnect();
    
    await Contact.findByIdAndDelete(id);
    
    revalidatePath("/admin/contact");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

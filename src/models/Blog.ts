import mongoose, { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this blog."],
      maxlength: [120, "Title cannot be more than 120 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required for the URL."],
      unique: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Please provide a short description."],
      maxlength: [300, "Short description cannot be more than 300 characters"],
    },
    content: {
      type: Object, // Stores TipTap JSON/HTML content
      required: [true, "Content is required."],
    },
    coverImage: {
      type: String, // Cloudinary URL
      required: [true, "Cover image is required."],
    },
    category: {
      type: String,
      required: [true, "Please select a category."],
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      required: [true, "Author name is required."],
    },
    seoTitle: {
      type: String,
      maxlength: [70, "SEO Title should be under 70 chars"],
    },
    seoDescription: {
      type: String,
      maxlength: [160, "SEO Description should be under 160 chars"],
    },
    ogImage: String,
    canonicalUrl: String,
    readTime: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    sharesCount: {
      type: Number,
      default: 0,
    },
    bookmarksCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Prevent re-compilation of model in hot-reloading
export default models.Blog || model("Blog", BlogSchema);

import mongoose, { Schema, Document, Model } from "mongoose";

export interface INote {
  text: string;
  author: string;
  createdAt: Date;
}

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  country?: string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "proposal_sent" | "closed_won" | "closed_lost" | "spam";
  notes: INote[];
  sourcePage: string;
  isFavorite: boolean;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String },
    company: { type: String },
    service: { type: String, required: true },
    budget: { type: String },
    country: { type: String },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["new", "contacted", "in_progress", "proposal_sent", "closed_won", "closed_lost", "spam"],
      default: "new",
      index: true 
    },
    notes: [
      {
        text: { type: String, required: true },
        author: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    sourcePage: { type: String, default: "/" },
    isFavorite: { type: Boolean, default: false },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Prevent re-compilation of the model in Next.js development
const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;

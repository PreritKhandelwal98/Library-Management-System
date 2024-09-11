import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  publishedYear: number;
  available: boolean;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  publishedYear: { type: Number },
  available: { type: Boolean, default: true },
});

export const Book = mongoose.model<IBook>("Book", bookSchema);

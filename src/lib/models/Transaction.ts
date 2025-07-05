import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  amount: number;
  date: Date;
  description: string;
  category: string;
}

// Predefined categories
export const CATEGORIES = [
  { value: "food", label: "Food & Dining", color: "#ef4444", icon: "🍽️" },
  { value: "transport", label: "Transport", color: "#3b82f6", icon: "🚗" },
  { value: "entertainment", label: "Entertainment", color: "#8b5cf6", icon: "🎬" },
  { value: "shopping", label: "Shopping", color: "#f59e0b", icon: "🛍️" },
  { value: "health", label: "Health & Medical", color: "#10b981", icon: "🏥" },
  { value: "education", label: "Education", color: "#06b6d4", icon: "📚" },
  { value: "utilities", label: "Utilities", color: "#6366f1", icon: "⚡" },
  { value: "housing", label: "Housing", color: "#84cc16", icon: "🏠" },
  { value: "income", label: "Income", color: "#22c55e", icon: "💰" },
  { value: "other", label: "Other", color: "#6b7280", icon: "📝" },
] as const;

export type CategoryValue = typeof CATEGORIES[number]["value"];

const TransactionSchema = new Schema<ITransaction>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: CATEGORIES.map(cat => cat.value),
    default: "other"
  },
});

export default mongoose.models?.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema); 
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import Transaction from "../../../lib/models/Transaction";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    const { id } = req.query;

    if (req.method === "PUT") {
      try {
        const { amount, date, description, category } = req.body;
        const transaction = await Transaction.findByIdAndUpdate(
          id,
          { amount, date, description, category: category || "other" },
          { new: true }
        );
        res.status(200).json(transaction);
        return;
      } catch (error) {
        res.status(400).json({ error: "Invalid data" });
        return;
      }
    }

    if (req.method === "DELETE") {
      try {
        await Transaction.findByIdAndDelete(id);
        res.status(204).end();
        return;
      } catch (error) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
    }

    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
} 
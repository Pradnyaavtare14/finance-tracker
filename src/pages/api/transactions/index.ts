// import type { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "../../../lib/mongodb";
// import Transaction from "../../../lib/models/Transaction";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   if (req.method === "GET") {
//     const transactions = await Transaction.find().sort({ date: -1 });
//     return res.status(200).json(transactions);
//   }

//   if (req.method === "POST") {
//     try {
//       const { amount, date, description } = req.body;
//       const transaction = await Transaction.create({ amount, date, description });
//       return res.status(201).json(transaction);
//     } catch (error) {
//       return res.status(400).json({ error: "Invalid data" });
//     }
//   }

//   res.setHeader("Allow", ["GET", "POST"]);
//   res.status(405).end(`Method ${req.method} Not Allowed`);
// }

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import Transaction from "../../../lib/models/Transaction";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const transactions = await Transaction.find().sort({ date: -1 });
      res.status(200).json(transactions);
      return;
    }

    if (req.method === "POST") {
      try {
        const { amount, date, description, category } = req.body;
        console.log("Creating transaction:", { amount, date, description, category });
        
        const transaction = await Transaction.create({ 
          amount, 
          date, 
          description, 
          category: category || "other" 
        });
        
        console.log("Transaction created:", transaction);
        res.status(201).json(transaction);
        return;
      } catch (error: any) {
        console.error("Error creating transaction:", error);
        res.status(400).json({ error: "Invalid data", details: error.message });
        return;
      }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
} 
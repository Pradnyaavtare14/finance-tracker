// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// type Transaction = {
//   _id?: string;
//   amount: number;
//   date: string;
//   description: string;
// };

// type Props = {
//   onSave: (t: Transaction) => void;
//   onCancel: () => void;
//   initial?: Transaction | null;
// };

// export default function TransactionForm({ onSave, onCancel, initial }: Props) {
//   const [amount, setAmount] = useState(initial?.amount || 0);
//   const [date, setDate] = useState(initial?.date?.slice(0, 10) || "");
//   const [description, setDescription] = useState(initial?.description || "");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setAmount(initial?.amount || 0);
//     setDate(initial?.date?.slice(0, 10) || "");
//     setDescription(initial?.description || "");
//     setError("");
//   }, [initial]);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!amount || !date || !description) {
//       setError("All fields are required.");
//       return;
//     }
//     onSave({ amount, date, description, _id: initial?._id });
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
//       <div>
//         <Label htmlFor="amount">Amount</Label>
//         <Input
//           id="amount"
//           type="number"
//           value={amount}
//           onChange={e => setAmount(Number(e.target.value))}
//           min={0.01}
//           step={0.01}
//           required
//         />
//       </div>
//       <div>
//         <Label htmlFor="date">Date</Label>
//         <Input
//           id="date"
//           type="date"
//           value={date}
//           onChange={e => setDate(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <Label htmlFor="description">Description</Label>
//         <Input
//           id="description"
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       {error && <div className="text-red-500">{error}</div>}
//       <div className="flex gap-2">
//         <Button type="submit">{initial ? "Update" : "Add"}</Button>
//         <Button type="button" variant="outline" onClick={onCancel}>
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// type Transaction = {
//   _id?: string;
//   amount: number;
//   date: string;
//   description: string;
// };

// type Props = {
//   onSave: (t: Transaction) => void;
//   onCancel: () => void;
//   initial?: Transaction | null;
// };

// export default function TransactionForm({ onSave, onCancel, initial }: Props) {
//   const [amount, setAmount] = useState(initial?.amount || 0);
//   const [date, setDate] = useState(initial?.date?.slice(0, 10) || "");
//   const [description, setDescription] = useState(initial?.description || "");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setAmount(initial?.amount || 0);
//     setDate(initial?.date?.slice(0, 10) || "");
//     setDescription(initial?.description || "");
//     setError("");
//   }, [initial]);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!amount || !date || !description) {
//       setError("All fields are required.");
//       return;
//     }
//     onSave({ amount, date, description, _id: initial?._id });
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="amount" className="text-sm font-medium text-black">
//             Amount
//           </Label>
//           <div className="relative mt-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <span className="text-gray-500 sm:text-sm">$</span>
//             </div>
//             <Input
//               id="amount"
//               type="number"
//               value={amount}
//               onChange={e => setAmount(Number(e.target.value))}
//               min={0.01}
//               step={0.01}
//               required
//               className="pl-7 text-black placeholder:text-gray-400"
//               placeholder="0.00"
//             />
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="date" className="text-sm font-medium text-black">
//             Date
//           </Label>
//           <Input
//             id="date"
//             type="date"
//             value={date}
//             onChange={e => setDate(e.target.value)}
//             required
//             className="mt-1 text-black placeholder:text-gray-400"
//           />
//         </div>

//         <div>
//           <Label htmlFor="description" className="text-sm font-medium text-black">
//             Description
//           </Label>
//           <Input
//             id="description"
//             value={description}
//             onChange={e => setDescription(e.target.value)}
//             required
//             className="mt-1 text-black placeholder:text-gray-400"
//             placeholder="e.g., Groceries, Salary, Rent"
//           />
//         </div>
//       </div>

//       {error && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex">
//             <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <p className="ml-2 text-sm text-red-800">{error}</p>
//           </div>
//         </div>
//       )}

//       <div className="flex gap-3 pt-4">
//         <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
//           {initial ? "Update Transaction" : "Add Transaction"}
//         </Button>
//         <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { CATEGORIES } from "../lib/models/Transaction";

// type Transaction = {
//   _id?: string;
//   amount: number;
//   date: string;
//   description: string;
//   category: string;
// };

// type Props = {
//   onSave: (t: Transaction) => void;
//   onCancel: () => void;
//   initial?: Transaction | null;
// };

// export default function TransactionForm({ onSave, onCancel, initial }: Props) {
//   const [amount, setAmount] = useState(initial?.amount || 0);
//   const [date, setDate] = useState(initial?.date?.slice(0, 10) || "");
//   const [description, setDescription] = useState(initial?.description || "");
//   const [category, setCategory] = useState(initial?.category || "other");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setAmount(initial?.amount || 0);
//     setDate(initial?.date?.slice(0, 10) || "");
//     setDescription(initial?.description || "");
//     setCategory(initial?.category || "other");
//     setError("");
//   }, [initial]);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!amount || !date || !description) {
//       setError("All fields are required.");
//       return;
//     }
//     onSave({ amount, date, description, category, _id: initial?._id });
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="amount" className="text-sm font-medium text-black">
//             Amount
//           </Label>
//           <div className="relative mt-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <span className="text-gray-500 sm:text-sm">$</span>
//             </div>
//             <Input
//               id="amount"
//               type="number"
//               value={amount}
//               onChange={e => setAmount(Number(e.target.value))}
//               min={0.01}
//               step={0.01}
//               required
//               className="pl-7 text-black"
//               placeholder="0.00"
//             />
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="date" className="text-sm font-medium text-black">
//             Date
//           </Label>
//           <Input
//             id="date"
//             type="date"
//             value={date}
//             onChange={e => setDate(e.target.value)}
//             required
//             className="mt-1 text-black"
//           />
//         </div>

//         <div>
//           <Label htmlFor="description" className="text-sm font-medium text-black">
//             Description
//           </Label>
//           <Input
//             id="description"
//             value={description}
//             onChange={e => setDescription(e.target.value)}
//             required
//             className="mt-1 text-black"
//             placeholder="e.g., Groceries, Salary, Rent"
//           />
//         </div>

//         <div>
//           <Label htmlFor="category" className="text-sm font-medium text-black">
//             Category
//           </Label>
//           <select
//             id="category"
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
//           >
//             {CATEGORIES.map((cat: any) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.icon} {cat.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {error && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex">
//             <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//             <p className="ml-2 text-sm text-red-800">{error}</p>
//           </div>
//         </div>
//       )}

//       <div className="flex gap-3 pt-4">
//         <Button 
//           type="submit" 
//           className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
//         >
//           {initial ? "Update Transaction" : "Add Transaction"}
//         </Button>
//         <Button 
//           type="button" 
//           variant="outline" 
//           onClick={onCancel}
//           className="flex-1"
//         >
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// } 

"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "../lib/models/Transaction";

type Transaction = {
  _id?: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

type Props = {
  onSave: (t: Transaction) => void;
  onCancel: () => void;
  initial?: Transaction | null;
};

export default function TransactionForm({ onSave, onCancel, initial }: Props) {
  const [amount, setAmount] = useState(Math.abs(initial?.amount || 0));
  const [date, setDate] = useState(initial?.date?.slice(0, 10) || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [category, setCategory] = useState(initial?.category || "other");
  const [type, setType] = useState(initial?.amount && initial.amount < 0 ? "expense" : "income");
  const [error, setError] = useState("");

  useEffect(() => {
    setAmount(Math.abs(initial?.amount || 0));
    setDate(initial?.date?.slice(0, 10) || "");
    setDescription(initial?.description || "");
    setCategory(initial?.category || "other");
    setType(initial?.amount && initial.amount < 0 ? "expense" : "income");
    setError("");
  }, [initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !date || !description) {
      setError("All fields are required.");
      return;
    }

    const finalAmount = type === "expense" ? -Math.abs(amount) : Math.abs(amount);
    onSave({ amount: finalAmount, date, description, category, _id: initial?._id });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="type" className="text-sm font-medium text-black">
            Type
          </Label>
          <select
            id="type"
            value={type}
            onChange={e => setType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <Label htmlFor="amount" className="text-sm font-medium text-black">
            Amount
          </Label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              min={0.01}
              step={0.01}
              required
              className="pl-7 text-black"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="date" className="text-sm font-medium text-black">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="mt-1 text-black"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium text-black">
            Description
          </Label>
          <Input
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            className="mt-1 text-black"
            placeholder="e.g., Groceries, Salary, Rent"
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-sm font-medium text-black">
            Category
          </Label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            {CATEGORIES.map((cat: any) => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="ml-2 text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {initial ? "Update Transaction" : "Add Transaction"}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

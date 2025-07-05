// "use client";
// import { useState } from "react";
// import TransactionForm from "./TransactionForm";
// import { Button } from "@/components/ui/button";

// type Transaction = {
//   _id: string;
//   amount: number;
//   date: string;
//   description: string;
// };

// type TransactionInput = {
//   _id?: string;
//   amount: number;
//   date: string;
//   description: string;
// };

// type Props = {
//   transactions: Transaction[];
//   onAdd: (t: TransactionInput) => void;
//   onEdit: (t: TransactionInput) => void;
//   onDelete: (id: string) => void;
// };

// export default function TransactionList({ transactions, onAdd, onEdit, onDelete }: Props) {
//   const [editing, setEditing] = useState<Transaction | null>(null);
//   const [adding, setAdding] = useState(false);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Transactions</h2>
//         <Button onClick={() => { setAdding(true); setEditing(null); }}>Add Transaction</Button>
//       </div>
//       {adding && (
//         <TransactionForm
//           onSave={t => { onAdd(t); setAdding(false); }}
//           onCancel={() => setAdding(false)}
//         />
//       )}
//       {editing && (
//         <TransactionForm
//           initial={editing}
//           onSave={t => { onEdit(t); setEditing(null); }}
//           onCancel={() => setEditing(null)}
//         />
//       )}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead>
//             <tr>
//               <th className="p-2">Date</th>
//               <th className="p-2">Description</th>
//               <th className="p-2">Amount</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map(t => (
//               <tr key={t._id}>
//                 <td className="p-2">{t.date.slice(0, 10)}</td>
//                 <td className="p-2">{t.description}</td>
//                 <td className="p-2">${t.amount.toFixed(2)}</td>
//                 <td className="p-2 flex gap-2">
//                   <Button size="sm" onClick={() => { setEditing(t); setAdding(false); }}>Edit</Button>
//                   <Button size="sm" variant="destructive" onClick={() => onDelete(t._id)}>Delete</Button>
//                 </td>
//               </tr>
//             ))}
//             {transactions.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center p-4 text-gray-500">No transactions yet.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import TransactionForm from "./TransactionForm";
// import { Button } from "@/components/ui/button";

// type Transaction = {
//   _id: string;
//   amount: number;
//   date: string;
//   description: string;
// };

// type TransactionInput = {
//   _id?: string;
//   amount: number;
//   date: string;
//   description: string;
// };

// type Props = {
//   transactions: Transaction[];
//   onAdd: (t: TransactionInput) => void;
//   onEdit: (t: TransactionInput) => void;
//   onDelete: (id: string) => void;
// };

// export default function TransactionList({ transactions, onAdd, onEdit, onDelete }: Props) {
//   const [editing, setEditing] = useState<Transaction | null>(null);
//   const [adding, setAdding] = useState(false);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
//           <p className="text-gray-600 mt-1">Manage your income and expenses</p>
//         </div>
//         <Button 
//           onClick={() => { setAdding(true); setEditing(null); }}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//           Add Transaction
//         </Button>
//       </div>

//       {/* Form Overlay */}
//       {(adding || editing) && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
//             <div className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 {editing ? 'Edit Transaction' : 'Add New Transaction'}
//               </h3>
//               <TransactionForm
//                 onSave={t => { 
//                   if (editing) {
//                     onEdit(t); 
//                     setEditing(null);
//                   } else {
//                     onAdd(t); 
//                     setAdding(false);
//                   }
//                 }}
//                 onCancel={() => { setAdding(false); setEditing(null); }}
//                 initial={editing}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Transactions List */}
//       <div className="space-y-3">
//         {transactions.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
//             <p className="text-gray-500">Start by adding your first transaction to track your finances.</p>
//           </div>
//         ) : (
//           transactions.map(t => (
//             <div key={t._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                     t.amount > 0 ? 'bg-green-100' : 'bg-red-100'
//                   }`}>
//                     <svg className={`w-5 h-5 ${
//                       t.amount > 0 ? 'text-green-600' : 'text-red-600'
//                     }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       {t.amount > 0 ? (
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                       ) : (
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
//                       )}
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-900">{t.description}</h4>
//                     <p className="text-sm text-gray-500">{formatDate(t.date)}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className={`text-lg font-semibold ${
//                     t.amount > 0 ? 'text-green-600' : 'text-red-600'
//                   }`}>
//                     {t.amount > 0 ? '+' : ''}${t.amount.toFixed(2)}
//                   </span>
//                   <div className="flex space-x-1">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => { setEditing(t); setAdding(false); }}
//                       className="h-8 w-8 p-0"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                       </svg>
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => onDelete(t._id)}
//                       className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// } 

"use client";
import { useState } from "react";
import TransactionForm from "./TransactionForm";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "../lib/models/Transaction";

type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

type TransactionInput = {
  _id?: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

type Props = {
  transactions: Transaction[];
  onAdd: (t: TransactionInput) => Promise<void>;
  onEdit: (t: TransactionInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function TransactionList({ transactions, onAdd, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [adding, setAdding] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryInfo = (categoryValue: string) => {
    return CATEGORIES.find((cat: any) => cat.value === categoryValue) || CATEGORIES.find((cat: any) => cat.value === "other")!;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
          <p className="text-gray-600 mt-1">Manage your income and expenses</p>
        </div>
        <Button 
          onClick={() => { setAdding(true); setEditing(null); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          data-add-transaction
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Transaction
        </Button>
      </div>

      {/* Form Overlay */}
      {(adding || editing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editing ? 'Edit Transaction' : 'Add New Transaction'}
              </h3>
              <TransactionForm
                onSave={t => { 
                  if (editing) {
                    onEdit(t); 
                    setEditing(null);
                  } else {
                    onAdd(t); 
                    setAdding(false);
                  }
                }}
                onCancel={() => { setAdding(false); setEditing(null); }}
                initial={editing}
              />
            </div>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-500">Start by adding your first transaction to track your finances.</p>
          </div>
        ) : (
          transactions.map(t => {
            const categoryInfo = getCategoryInfo(t.category);
            return (
              <div key={t._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      t.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className="text-lg">{categoryInfo.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{t.description}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">{formatDate(t.date)}</span>
                        <span 
                          className="px-2 py-1 text-xs rounded-full text-white"
                          style={{ backgroundColor: categoryInfo.color }}
                        >
                          {categoryInfo.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg font-semibold ${
                      t.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {t.amount > 0 ? '+' : ''}${t.amount.toFixed(2)}
                    </span>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => { setEditing(t); setAdding(false); }}
                        className="h-8 w-8 p-0"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(t._id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
} 
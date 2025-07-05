// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function Home() {
//   return (
//     <div
//       className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
//     >
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               src/pages/index.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>
//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import TransactionList from "@/components/TransactionList";
// import ExpensesChart from "@/components/ExpensesChart";
// import CategoryPieChart from "../components/CategoryPieChart";
// import IncomeSettings from "../components/IncomeSettings";

// type Transaction = {
//   _id: string;
//   amount: number;
//   date: string;
//   description: string;
//   category: string;
// };

// type TransactionInput = {
//   _id?: string;
//   amount: number;
//   date: string;
//   description: string;
//   category: string;
// };

// export default function Home() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [error, setError] = useState("");
//   const [incomeTarget, setIncomeTarget] = useState(0); // Default income target

//   async function fetchTransactions() {
//     try {
//       const res = await fetch("/api/transactions");
//       const data = await res.json();
//       console.log("Fetched transactions:", data.length, "transactions");
//       setTransactions(data);
//     } catch {
//       setError("Failed to load transactions.");
//     }
//   }

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   useEffect(() => {
//     // Debug: log transactions and card calculations whenever transactions change
//     console.log('Updated transactions:', transactions);
//     const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
//     const actualIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
//     const totalBalance = actualIncome - totalExpenses;
//     const incomeProgress = incomeTarget > 0 ? (actualIncome / incomeTarget) * 100 : 0;
//     console.log('Card calculations:', { totalExpenses, actualIncome, totalBalance, incomeTarget, incomeProgress });
//   }, [transactions, incomeTarget]);

//   async function addTransaction(t: TransactionInput) {
//     try {
//       console.log("Sending transaction data:", t);
//       const res = await fetch("/api/transactions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(t),
//       });
      
//       if (!res.ok) {
//         const errorData = await res.json();
//         console.error("API Error:", errorData);
//         throw new Error(errorData.error || "Failed to add transaction");
//       }
      
//       const result = await res.json();
//       console.log("Transaction added successfully:", result);
      
//       // Force refresh transactions
//       await fetchTransactions();
//       console.log("Transactions refreshed");
//     } catch (error: any) {
//       console.error("Error adding transaction:", error);
//       setError(error.message || "Failed to add transaction.");
//     }
//   }

//   async function editTransaction(t: TransactionInput) {
//     try {
//       if (!t._id) throw new Error("No transaction ID");
//       const res = await fetch(`/api/transactions/${t._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(t),
//       });
//       if (!res.ok) throw new Error();
//       await fetchTransactions();
//       console.log("Transaction edited, transactions refreshed");
//     } catch {
//       setError("Failed to update transaction.");
//     }
//   }

//   async function deleteTransaction(id: string) {
//     try {
//       const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error();
//       await fetchTransactions();
//       console.log("Transaction deleted, transactions refreshed");
//     } catch {
//       setError("Failed to delete transaction.");
//     }
//   }

//   const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
//   const actualIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
//   const totalBalance = incomeTarget - totalExpenses; // Income Target - Total Expenses
//   const incomeProgress = incomeTarget > 0 ? (actualIncome / incomeTarget) * 100 : 0;
  
//   // Debug logging
//   console.log("Calculations:", {
//     transactionsCount: transactions.length,
//     totalExpenses,
//     actualIncome,
//     incomeTarget,
//     totalBalance
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="max-w-6xl mx-auto p-6">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Personal Finance Visualizer</h1>
//           <p className="text-gray-600 text-lg">Track your expenses and visualize your spending patterns</p>
//         </div>

//         {/* Error Alert */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-800">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Available Balance</p>
//                 <p className="text-2xl font-bold text-gray-900">${totalBalance.toFixed(2)}</p>
//                 {/* <p className="text-xs text-gray-500">Target - Expenses</p> */}
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="ml-4 flex-1">
//                 <p className="text-sm font-medium text-gray-600">Income Target</p>
//                 <p className="text-2xl font-bold text-green-600">${incomeTarget.toFixed(2)}</p>
//                 <div className="mt-2">
//                   <div className="flex justify-between text-xs text-gray-500 mb-1">
//                     <span>Actual: ${actualIncome.toFixed(2)}</span>
//                     <span>{incomeProgress.toFixed(1)}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div 
//                       className="bg-green-600 h-2 rounded-full transition-all duration-300"
//                       style={{ width: `${Math.min(incomeProgress, 100)}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Expenses</p>
//                 <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Transactions</p>
//                 <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Income Settings */}
//         <div className="mb-8">
//           <IncomeSettings 
//             currentIncome={incomeTarget} 
//             onSetIncome={setIncomeTarget} 
//           />
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Transactions Section */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <TransactionList
//               transactions={transactions}
//               onAdd={addTransaction}
//               onEdit={editTransaction}
//               onDelete={deleteTransaction}
//             />
//           </div>

//           {/* Category Pie Chart */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <CategoryPieChart transactions={transactions} />
//           </div>
//         </div>

//         {/* Monthly Chart */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <ExpensesChart transactions={transactions} />
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import TransactionList from "@/components/TransactionList";
import ExpensesChart from "@/components/ExpensesChart";
import CategoryPieChart from "../components/CategoryPieChart";
import IncomeSettings from "../components/IncomeSettings";
import BudgetSettings from "../components/BudgetSettings";
import BudgetComparisonChart from "../components/BudgetComparisonChart";
import SpendingInsights from "../components/SpendingInsights";
import Navbar from "../components/Navbar";
import { useIncomeTarget } from "../lib/hooks/useIncomeTarget";

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

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const { incomeTarget, updateIncomeTarget } = useIncomeTarget();
  const [categoryBudgets, setCategoryBudgets] = useState<{ [key: string]: number }>({});

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch {
      setError("Failed to load transactions.");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function addTransaction(t: TransactionInput) {
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add transaction");
      }

      await res.json();
      await fetchTransactions();
    } catch (error: any) {
      setError(error.message || "Failed to add transaction.");
    }
  }

  async function editTransaction(t: TransactionInput) {
    try {
      if (!t._id) throw new Error("No transaction ID");
      const res = await fetch(`/api/transactions/${t._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
      });
      if (!res.ok) throw new Error();
      await fetchTransactions();
    } catch {
      setError("Failed to update transaction.");
    }
  }

  async function deleteTransaction(id: string) {
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await fetchTransactions();
    } catch {
      setError("Failed to delete transaction.");
    }
  }

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const actualIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = incomeTarget - totalExpenses; // ✅ Correct logic
  const incomeProgress = incomeTarget > 0 ? (actualIncome / incomeTarget) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Personal Finance Visualizer</h1>
          <p className="text-gray-600 text-lg">Track your expenses and visualize your spending patterns</p>
        </div> */}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Available Balance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-gray-900">${totalBalance.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Income Target */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">Income Target</p>
                <p className="text-2xl font-bold text-green-600">${incomeTarget.toFixed(2)}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Actual: ${actualIncome.toFixed(2)}</span>
                    <span>{incomeProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(incomeProgress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Transaction Count */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Income Settings */}
                {/* Quick Actions */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Add</h3>
                <p className="text-sm text-gray-600">Add a new transaction</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Set Budgets</h3>
                <p className="text-sm text-gray-600">Manage category budgets</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-600">Detailed charts & insights</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div> */}

        {/* Income Target */}
        <div className="mb-8">
          <IncomeSettings 
            currentIncome={incomeTarget} 
            onSetIncome={updateIncomeTarget} 
          />
        </div>

        {/* Overview Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <CategoryPieChart transactions={transactions} />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <ExpensesChart transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

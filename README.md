# Finance Tracker - Personal Finance Management App

A modern, responsive web application for personal finance management built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### 📊 Dashboard
- **Income Target Management**: Set and track your monthly income goals
- **Expense Tracking**: Monitor total expenses with real-time updates
- **Available Balance**: Calculate remaining budget (Income Target - Total Expenses)
- **Quick Actions**: Easy access to add transactions and manage finances

### 💰 Transaction Management
- **Add/Edit/Delete Transactions**: Full CRUD operations for financial records
- **Income vs Expense Tracking**: Separate tracking for income (positive) and expenses (negative)
- **Category Classification**: Organize transactions by categories (Food, Transport, Entertainment, etc.)
- **Date-based Organization**: Track transactions with specific dates

### 📈 Analytics & Insights
- **Category Breakdown**: Visual pie chart showing spending by category
- **Monthly Overview**: Bar chart displaying monthly expense trends
- **Daily Analysis**: Line chart for the last 30 days of spending
- **Top Spending Categories**: Identify your highest expense areas
- **Net Balance Tracking**: Monitor overall financial health

### 💳 Budget Management
- **Category Budgets**: Set spending limits for different categories
- **Budget vs Actual Comparison**: Visual charts showing planned vs actual spending
- **Spending Insights**: Detailed analysis of budget performance
- **Remaining Budget Tracking**: Monitor how much budget is left in each category

### 🎨 User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with consistent theming
- **Navigation**: Easy access to all features via the navbar
- **Real-time Updates**: Instant reflection of changes across all pages

## 🛠️ Technology Stack

- **Frontend**: Next.js 13+ with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful API endpoints
- **State Management**: React hooks with localStorage persistence
- **UI Components**: Custom component library with shadcn/ui

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MongoDB database

### 1. Clone the Repository
```bash
git clone <repository-url>
cd finance-website
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
```

### 4. Database Setup
Ensure your MongoDB database is running and accessible. The app will automatically create the necessary collections.

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Usage Guide

### Getting Started
1. **Set Income Target**: Navigate to the dashboard and set your monthly income target
2. **Add Transactions**: Use the "Add Transaction" button to record income and expenses
3. **Categorize Spending**: Assign categories to your transactions for better organization
4. **Monitor Progress**: Check the dashboard for real-time financial overview

### Adding Transactions
1. Click "Add Transaction" from the navbar or transactions page
2. Select transaction type (Income or Expense)
3. Enter amount, date, description, and category
4. Save to see it reflected immediately across all pages

### Setting Budgets
1. Navigate to the Budget page
2. Set spending limits for different categories
3. Monitor budget vs actual spending in the comparison charts
4. Review spending insights for better financial planning

### Viewing Analytics
1. Visit the Analytics page for detailed financial insights
2. Explore category breakdowns and spending trends
3. Use the time series analysis to identify patterns
4. Review top spending categories for optimization opportunities

## 📁 Project Structure

```
finance-website/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── TransactionList.tsx
│   │   ├── TransactionForm.tsx
│   │   ├── IncomeSettings.tsx
│   │   ├── ExpensesChart.tsx
│   │   ├── CategoryPieChart.tsx
│   │   ├── BudgetSettings.tsx
│   │   ├── BudgetComparisonChart.tsx
│   │   ├── SpendingInsights.tsx
│   │   └── Navbar.tsx
│   ├── lib/
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── useIncomeTarget.ts
│   │   ├── models/         # Data models
│   │   │   └── Transaction.ts
│   │   ├── mongodb.ts      # Database connection
│   │   └── utils.ts        # Utility functions
│   ├── pages/
│   │   ├── api/            # API routes
│   │   │   └── transactions/
│   │   ├── index.tsx       # Dashboard
│   │   ├── transactions.tsx
│   │   ├── analytics.tsx
│   │   └── budget.tsx
│   └── styles/
│       └── globals.css
├── public/                 # Static assets
├── package.json
├── next.config.ts
├── tailwind.config.js
└── README.md
```

## 🔧 API Endpoints

### Transactions
- `GET /api/transactions` - Fetch all transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/[id]` - Update transaction
- `DELETE /api/transactions/[id]` - Delete transaction

## 🎯 Key Features Explained

### Income Target Persistence
- Uses custom `useIncomeTarget` hook for centralized state management
- Persists data in localStorage to survive page refreshes
- Synchronized across all pages in real-time

### Transaction Categories
- Predefined categories: Food, Transport, Entertainment, Shopping, Bills, Other
- Each category has unique icons and colors for easy identification
- Supports both income and expense categorization

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive layouts for different screen sizes
- Touch-friendly interface for mobile devices

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **Railway**: Connect repository and add environment variables
- **Heroku**: Add buildpack and configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed description
3. Include steps to reproduce the problem

## 🔮 Future Enhancements

- [ ] Export functionality (PDF/CSV reports)
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Financial goals tracking
- [ ] Investment portfolio management
- [ ] Bill reminders
- [ ] Data visualization improvements
- [ ] Mobile app version

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

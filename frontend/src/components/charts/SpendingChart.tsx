

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';

// Register the necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the shape of our transaction data
interface Transaction {
  _id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

// Define the component's props
interface SpendingChartProps {
  transactions: Transaction[];
}


const SpendingChart: React.FC<SpendingChartProps> = ({ transactions }) => {


  const expenseData = transactions.filter((t: Transaction) => t.type === 'expense');
  
  // Group expenses by category and sum the amounts
  const spendingByCategory: { [key: string]: number } = {};

  expenseData.forEach((transaction: Transaction) => {
    const category = transaction.category;
    if (spendingByCategory[category]) {
      spendingByCategory[category] += transaction.amount;
    } else {
      spendingByCategory[category] = transaction.amount;
    }
  });

  // Extract labels (categories) and data (spending)
  const labels = Object.keys(spendingByCategory);
  const dataValues = Object.values(spendingByCategory);

  // Define the data for the chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Spending by Category',
        data: dataValues,
        backgroundColor: 'rgb(128,128,128)',
        // backgroundColor: 'rgba(90.5%, 0.093, 164.15)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Define the options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Spending by Category',
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'bar'>) {
            return `₹${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number | string) {
            return `₹${value}`;
          }
        }
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SpendingChart;
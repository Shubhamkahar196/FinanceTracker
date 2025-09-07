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
interface IncomeChartProps {
  transactions: Transaction[];
}

const IncomeChart: React.FC<IncomeChartProps> = ({ transactions }) => {
  const incomeData = transactions.filter((t: Transaction) => t.type === 'income');

  // Group income by category and sum the amounts
  const incomeByCategory: { [key: string]: number } = {};

  incomeData.forEach((transaction: Transaction) => {
    const category = transaction.category;
    if (incomeByCategory[category]) {
      incomeByCategory[category] += transaction.amount;
    } else {
      incomeByCategory[category] = transaction.amount;
    }
  });

  // Extract labels (categories) and data (income)
  const labels = Object.keys(incomeByCategory);
  const dataValues = Object.values(incomeByCategory);

  // Define the data for the chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Income by Category',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
        text: 'Income by Category',
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

export default IncomeChart;

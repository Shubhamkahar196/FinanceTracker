import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import SpendingChart from '../components/charts/SpendingChart';
import IncomeChart from '../components/charts/IncomeChart';


interface Transaction {
  _id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  description?: string;
}

// Access the environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'income' | 'expense'>('expense');
  const [newCategory, setNewCategory] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editType, setEditType] = useState<'income' | 'expense'>('expense');
  const [editCategory, setEditCategory] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
     
      const token = localStorage.getItem('token');


      if (!token) {
        router.push('/');
        return;
      }

      setLoading(true);
      try {
        if (!API_BASE_URL) {
          throw new Error('API URL not configured.');
        }

        const response = await axios.get(`${API_BASE_URL}/transaction/`, {
          headers: {

            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response && err.response.status === 401) {

          localStorage.removeItem('token');
          router.push('/');
        } else {
          setError('Failed to fetch transactions. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.post(`${API_BASE_URL}/transaction/add`, {
        amount: parseFloat(newAmount),
        type: newType,
        category: newCategory,
        date: newDate,
        description: newDescription,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewAmount('');
      setNewCategory('');
      setNewDate('');
      setNewDescription('');
      // Refetch transactions
      const response = await axios.get(`${API_BASE_URL}/transaction/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction.');
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setEditAmount(transaction.amount.toString());
    setEditType(transaction.type);
    setEditCategory(transaction.category);
    setEditDate(new Date(transaction.date).toISOString().split('T')[0]);
    setEditDescription(transaction.description || '');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTransaction) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.put(`${API_BASE_URL}/transaction/${editingTransaction._id}`, {
        amount: parseFloat(editAmount),
        type: editType,
        category: editCategory,
        date: editDate,
        description: editDescription,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refetch transactions
      const response = await axios.get(`${API_BASE_URL}/transaction/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
      setEditingTransaction(null);
      setEditAmount('');
      setEditCategory('');
      setEditDate('');
      setEditDescription('');
    } catch (err) {
      console.error('Error updating transaction:', err);
      setError('Failed to update transaction.');
    }
  };

  const cancelEdit = () => {
    setEditingTransaction(null);
    setEditAmount('');
    setEditCategory('');
    setEditDate('');
    setEditDescription('');
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.delete(`${API_BASE_URL}/transaction/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refetch transactions
        const response = await axios.get(`${API_BASE_URL}/transaction/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError('Failed to delete transaction.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <p className="text-2xl font-semibold text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
        <p className="text-xl text-red-700 mb-4">{error}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded shadow"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8">
      <Head>
        <title>Finance Tracker - Dashboard</title>
      </Head>

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-lg">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Logout
        </button>
      </div>

      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg mb-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add New Transaction</h2>
        {!editingTransaction ? (
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="number"
              placeholder="Amount"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as 'income' | 'expense')}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <input
              type="text"
              placeholder="Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <input
              type="text"
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition md:col-span-2"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 md:col-span-2"
            >
              Add Transaction
            </button>
          </form>
        ) : (
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="number"
              placeholder="Amount"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <select
              value={editType}
              onChange={(e) => setEditType(e.target.value as 'income' | 'expense')}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <input
              type="text"
              placeholder="Category"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <input
              type="text"
              placeholder="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition md:col-span-2"
            />
            <div className="flex space-x-4 md:col-span-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
              >
                Update Transaction
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Charts Section */}
        <div className="col-span-1 md:col-span-2 space-y-8">
          <SpendingChart transactions={transactions} />
          <IncomeChart transactions={transactions} />
        </div>

        {/* Transaction List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions found.</p>
          ) : (
            <ul>
              {transactions.map(t => (
                <li key={t._id} className="py-2 border-b last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                    <span className={`font-bold ${t.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                      ₹{t.amount.toFixed(2)}
                    </span>
                      <span className="text-sm text-gray-500 ml-2">{t.category}</span>
                      <p className="text-xs text-gray-400">{new Date(t.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-600 mr-4">{t.description}</p>
                      <button
                        onClick={() => handleEdit(t)}
                        className="text-blue-500 hover:text-blue-700 font-bold mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
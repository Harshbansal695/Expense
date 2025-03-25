import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Filter from "./Filter"; // Import Filter component

const GetAll = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(""); // Filter state
  const [selectedStatus, setSelectedStatus] = useState(""); // Filter state

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/expense/getall",
        { withCredentials: true }
      );

      if (Array.isArray(res.data.expenses)) {
        setExpenses(res.data.expenses);
      } else {
        setExpenses([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/expense/remove/${id}`, {
        withCredentials: true,
      });

      toast.success("Expense removed successfully!");
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense._id);
    setFormData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/expense/update/${editingExpense}`,
        formData,
        { withCredentials: true }
      );

      toast.success("Expense updated successfully!");
      fetchExpenses();
      setEditingExpense(null);
    } catch (error) {
      toast.error("Failed to update expense");
    }
  };

  const toggleDone = async (id, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/expense/${id}/done`,
        { done: !currentStatus },
        { withCredentials: true }
      );

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense._id === id ? { ...expense, done: !currentStatus } : expense
        )
      );

      toast.success("Status updated!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // **Filter Expenses**
  const filteredExpenses = expenses.filter((expense) => {
    if (
      selectedCategory &&
      selectedCategory !== "all" &&
      expense.category.toLowerCase() !== selectedCategory.toLowerCase()
    ) {
      return false;
    }
    if (selectedStatus === "done" && !expense.done) return false;
    if (selectedStatus === "undone" && expense.done) return false;
    return true;
  });

  const totalUndoneAmount = filteredExpenses
    .filter((expense) => !expense.done)
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">All Expenses</h2>

      {/* If editing, show edit form and hide the table */}
      {editingExpense ? (
        <div className="bg-white shadow-lg p-6 rounded-lg max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-center mb-4">
            Update Expense
          </h3>

          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border p-2 w-full mb-4 rounded-md"
          />

          <label className="block text-gray-700 font-semibold mb-2">
            Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="border p-2 w-full mb-4 rounded-md"
          />

          <div className="flex justify-between">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Update
            </button>
            <button
              onClick={() => setEditingExpense(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <Filter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />

          {loading ? (
            <p className="text-center text-lg">Loading...</p>
          ) : filteredExpenses.length === 0 ? (
            <p className="text-center text-lg">No expenses found.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 mt-6 shadow-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border p-2">Done</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr
                    key={expense._id}
                    className="text-center bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <td className="border p-2">
                      <input
                        type="checkbox"
                        checked={expense.done}
                        onChange={() => toggleDone(expense._id, expense.done)}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </td>
                    <td className="border p-2">{expense.description}</td>
                    <td className="border p-2">{expense.category}</td>
                    <td className="border p-2">${expense.amount}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleEditClick(expense)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold bg-gray-200">
                  <td className="border p-2 text-center" colSpan="3">
                    Total (Undone Only)
                  </td>
                  <td className="border p-2">${totalUndoneAmount}</td>
                  <td className="border p-2"></td>
                </tr>
              </tfoot>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default GetAll;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const CreateExpense = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.category) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/expense/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ description: "", amount: "", category: "" });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition-all shadow-md">
            + Add New Expense
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg bg-white p-6 rounded-lg shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-gray-800">
              Add Expense
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500">
              Enter your expense details below and click "Add".
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="block text-gray-700 text-lg font-medium"
              >
                Description
              </Label>
              <Input
                id="description"
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black transition shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="amount"
                className="block text-gray-700 text-lg font-medium"
              >
                Amount (₹)
              </Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black transition shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="block text-gray-700 text-lg font-medium"
              >
                Category
              </Label>
              <Select
                name="category"
                onValueChange={handleCategoryChange}
                value={formData.category}
              >
                <SelectTrigger className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 transition-all duration-300 focus:outline-none focus:border-black focus:ring-2 focus:ring-black hover:bg-gray-200">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg shadow-lg overflow-hidden absolute top-full mt-2 w-full z-50">
                  <SelectGroup>
                    <SelectItem
                      className="px-4 py-3 text-lg font-medium cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-all"
                      value="Rent"
                    >
                      🏠 Rent
                    </SelectItem>
                    <SelectItem
                      className="px-4 py-3 text-lg font-medium cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-all"
                      value="Food"
                    >
                      🍔 Food
                    </SelectItem>
                    <SelectItem
                      className="px-4 py-3 text-lg font-medium cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-all"
                      value="Salary"
                    >
                      💰 Salary
                    </SelectItem>
                    <SelectItem
                      className="px-4 py-3 text-lg font-medium cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-all"
                      value="Shopping"
                    >
                      🛍️ Shopping
                    </SelectItem>
                    <SelectItem
                      className="px-4 py-3 text-lg font-medium cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-all"
                      value="Others"
                    >
                      📌 Others
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center space-x-3 mt-6">
              <Button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all shadow-md"
              >
                Add Expense
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition-all shadow-md"
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateExpense;

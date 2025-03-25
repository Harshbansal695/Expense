import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = ({
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 justify-center items-center bg-gray-100 p-4 rounded-xl shadow-md">
      {/* Filter by Category */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <Select
          onValueChange={(value) => setSelectedCategory(value)}
          value={selectedCategory || "all"}
        >
          <SelectTrigger className="w-52 bg-white border border-gray-300 p-2 rounded-lg shadow-sm hover:border-gray-400 focus:ring focus:ring-blue-300">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-md border border-gray-200">
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Filter by Status */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
        <Select
          onValueChange={(value) => setSelectedStatus(value)}
          value={selectedStatus || ""}
        >
          <SelectTrigger className="w-52 bg-white border border-gray-300 p-2 rounded-lg shadow-sm hover:border-gray-400 focus:ring focus:ring-blue-300">
            <SelectValue placeholder="Mark As" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-md border border-gray-200">
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="undone">Undone</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;

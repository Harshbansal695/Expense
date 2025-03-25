import React from "react";
import CreateExpense from "./CreateExpense";
import GetAll from "./GetAll";
import Filter from "./Filter";

const Home = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto mt-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-semibold text-xl">Expense</h1>
          <CreateExpense />
        </div>

        <GetAll />
      </div>
    </div>
  );
};

export default Home;

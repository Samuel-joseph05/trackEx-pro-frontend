"use client";

import ExpenseCard from "./ExpenseCard";
import EditExpenseCard from "./EditExpenseCard";

const ExpenseGrid = ({
  expenses,
  editingField,
  formData,
  setFormData,
  handleChange,
  handleUpdate,
  setEditingField,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {expenses.map((expense) =>
        editingField === expense._id ? (
          <EditExpenseCard
            key={expense._id}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            setEditingField={setEditingField}
          />
        ) : (
          <ExpenseCard
            key={expense._id}
            expense={expense}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )
      )}
    </div>
  );
};

export default ExpenseGrid;
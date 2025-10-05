import React from "react";

function Model({ employee, open, onClose, onEdit }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
      <div className=""></div>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-10 flex flex-col items-center">
        <button
          className="absolute top-4 right-6 text-gray-400 hover:text-red-500 font-bold text-2xl focus:outline-none"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700 tracking-tight">Employee Details</h2>
        <div className="w-full space-y-5">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-800">Name:</span>
            <span className="text-gray-600">{employee?.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-800">Email:</span>
            <span className="text-gray-600">{employee?.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-800">Position:</span>
            <span className="text-gray-600">{employee?.position}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-800">Salary:</span>
            <span className="text-gray-600">{employee?.salary}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Department:</span>
            <span className="text-gray-600">{employee?.department}</span>
          </div>
        </div>
        <button
          className="mt-10 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl text-lg transition"
          onClick={() => onEdit && onEdit(employee?._id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default Model;

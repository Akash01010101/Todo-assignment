import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDueDate } from '../store/slices/todoSlice';

const DueDateModel = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(task?.dueDate || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setDueDate({
      taskId: task.id,
      dueDate: selectedDate
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
  <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-200">Set Due Date</h2>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Task: {task?.text}
        </label>
        <input
          type="datetime-local"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          min={new Date().toISOString().slice(0, 16)}
          required
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>

  );
};
export default DueDateModel
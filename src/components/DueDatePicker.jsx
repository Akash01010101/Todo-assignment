import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDueDate } from '../store/slices/todoSlice';

const DueDatePicker = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(state => state.todos.selectedTask);

  const handleDateChange = (e) => {
    if (selectedTask) {
      dispatch(setDueDate({
        taskId: selectedTask.id,
        dueDate: e.target.value
      }));
    }
  };
  const formatDateForInput = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  if (!selectedTask) {
    return (
      <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-500 bg-gray-700 rounded-lg cursor-not-allowed">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Select a task to add due date
      </button>
    );
  }

  return (
    <div className="w-full p-4 bg-gray-800 rounded-lg shadow-md">
    <h3 className="text-sm font-medium text-gray-200 mb-2">Due Date</h3>
    <input
      type="date"
      value={formatDateForInput(selectedTask.dueDate)}
      onChange={handleDateChange}
      className="w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      min={new Date().toISOString().split("T")[0]}
    />
  </div>
  
  );
};

export default DueDatePicker;

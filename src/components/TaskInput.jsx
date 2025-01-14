import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/slices/todoSlice';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTask({ text: task, priority }));
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
          className="flex-1 p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:ring focus:ring-green-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:ring focus:ring-green-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          ADD TASK
        </button>
      </div>
    </form>
  );
};

export default TaskInput;

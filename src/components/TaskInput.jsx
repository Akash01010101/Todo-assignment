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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
          className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:ring focus:ring-green-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:ring focus:ring-green-500 md:w-auto"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 md:w-auto"
      >
        ADD TASK
      </button>
    </form>
  );
};

export default TaskInput;

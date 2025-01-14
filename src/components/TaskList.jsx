import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTask,
  toggleTask,
  setPriority,
  selectTask,
} from "../store/slices/todoSlice";
import DueDateModal from "./DueDateModel";

const TaskList = (props) => {
  const tasks = useSelector((state) => state.todos.tasks);
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDueDateModalOpen, setIsDueDateModalOpen] = useState(false);

  const formatDueDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const filterTasks = () => {
    const today = new Date().toDateString();

    if (props.selectedTab === "Today") {
      return tasks.filter(
        (task) => task.dueDate && new Date(task.dueDate).toDateString() === today
      );
    }

    if (props.selectedTab === "Important") {
      return tasks.filter((task) => task.priority === "high");
    }

    return tasks;
  };

  const filteredTasks = filterTasks();

  return (
    <div className="mt-6">
      {filteredTasks.map((task) => (
        <div
          onClick={() => {
            dispatch(selectTask(task));
          }}
          key={task.id}
          className="flex flex-col gap-2 p-4 mb-4 bg-gray-800 text-gray-200 rounded-lg shadow-md sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-row gap-2 sm:flex-row sm:items-center sm:gap-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
              className="w-5 h-5 text-gray-400 focus:ring-gray-500"
            />
            <div>
              <span
                className={`${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>
              {task.dueDate && (
                <p className="text-sm text-gray-400">
                  Due: {formatDueDate(task.dueDate)}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <button
              onClick={() => {
                setSelectedTask(task);
                setIsDueDateModalOpen(true);
              }}
              className="text-sm text-gray-400 hover:text-gray-200"
            >
              {task.dueDate ? "Edit Due Date" : "Add Due Date"}
            </button>
            <select
              value={task.priority}
              onChange={(e) =>
                dispatch(setPriority({ id: task.id, priority: e.target.value }))
              }
              className="p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:ring-gray-500 focus:border-gray-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              onClick={() => dispatch(removeTask(task.id))}
              className="p-2 text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <DueDateModal
        isOpen={isDueDateModalOpen}
        onClose={() => {
          setIsDueDateModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskList;

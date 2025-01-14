import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/slices/authSlice";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import DueDateModel from "./components/DueDateModel";
import WeatherCard from "./components/WeatherCard";
import ClockCard from "./components/ClockCard";
import SetReminder from "./components/SetReminder";
import { setReminder } from "./store/slices/todoSlice";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.todos.tasks);
  const selectedTask = useSelector((state) => state.todos.selectedTask);
  const [isDueDateModalOpen, setIsDueDateModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All Tasks");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSetReminder = (reminderTime) => {
    if (selectedTask) {
      dispatch(setReminder({ taskId: selectedTask.id, reminderTime }));
      const delay = new Date(reminderTime) - new Date();

      if (delay > 0) {
        setTimeout(() => {
          alert(`Reminder: "${selectedTask.text}"`);
        }, delay);
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col lg:flex-row">
        <button
          className="lg:hidden p-4 bg-gray-800 text-gray-300 border-b border-gray-700"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>

        <div
          className={`lg:block ${
            isSidebarOpen ? "block" : "hidden"
          } w-64 bg-gray-800 p-4 shadow-sm absolute lg:static inset-y-0 lg:inset-auto lg:relative z-10`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-700"></div>
              <div>
                <p className="text-sm text-gray-400">Hey,</p>
                <p className="font-medium">{user?.name || "ABCD"}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-white"
            >
              Logout
            </button>
          </div>
          <nav className="space-y-2">
            <button
              className={`w-full text-left px-4 py-2 rounded-lg ${
                selectedTab === "All Tasks" ? "bg-gray-700" : ""
              }`}
              onClick={() => setSelectedTab("All Tasks")}
            >
              All Tasks
            </button>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg ${
                selectedTab === "Today" ? "bg-green-700 text-green-300" : ""
              }`}
              onClick={() => setSelectedTab("Today")}
            >
              Today
            </button>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg ${
                selectedTab === "Important" ? "bg-gray-700" : ""
              }`}
              onClick={() => setSelectedTab("Important")}
            >
              Important
            </button>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg ${
                selectedTab === "Planned" ? "bg-gray-700" : ""
              }`}
              onClick={() => setSelectedTab("Planned")}
            >
              Planned
            </button>
          </nav>
          <div className="mt-8 p-4 bg-gray-700 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-300 mb-2">Today Tasks</h3>
            <p className="text-2xl font-bold">{tasks.length}</p>
          </div>
          <ClockCard />
        </div>

        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">{selectedTab}</h1>
            <TaskInput />
            <TaskList selectedTab={selectedTab} />
          </div>
        </div>

        <div className="lg:w-64 lg:relative lg:top-0 lg:right-0 w-full bg-gray-800 p-4 shadow-sm">
          <div className="space-y-4">
            <button
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
              onClick={() => {
                if (selectedTask) {
                  setIsDueDateModalOpen(true);
                }
              }}
            >
              Add Due Date
            </button>
            <button
              onClick={() => {
                setIsReminderModalOpen(true);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
            >
              Set Reminder
            </button>
            <WeatherCard />
          </div>
        </div>

        <DueDateModel
          isOpen={isDueDateModalOpen}
          onClose={() => setIsDueDateModalOpen(false)}
          task={selectedTask}
        />
        <SetReminder
          isOpen={isReminderModalOpen}
          onClose={() => setIsReminderModalOpen(false)}
          onSetReminder={handleSetReminder}
          task={selectedTask}
        />
      </div>
    </ProtectedRoute>
  );
};

export default App;

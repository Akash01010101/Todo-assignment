import React, { useState } from "react";

const SetReminder = ({ isOpen, onClose, onSetReminder }) => {
  const [reminderTime, setReminderTime] = useState("");
  const handleSubmit = () => {
    if (reminderTime) {
      onSetReminder(reminderTime);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold text-gray-200">Set Reminder</h2>
        <input
          type="datetime-local"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="border border-gray-600 bg-gray-700 text-gray-200 p-2 w-full mt-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetReminder;

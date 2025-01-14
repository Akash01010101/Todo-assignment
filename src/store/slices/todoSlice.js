import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    tasks: [],
    loading: false,
    error: null
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload.text,
        priority: action.payload.priority || 'medium',
        completed: false,
        createdAt: new Date().toISOString()
      });
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setPriority: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    setDueDate: (state, action) => {
      const { taskId, dueDate } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.dueDate = dueDate;
      }
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  },
  setReminder: (state, action) => {
    const { taskId, reminderTime } = action.payload;
    const task = state.tasks.find((task) => task.id === taskId);
    if (task) {
      task.reminderTime = reminderTime;
    }
  },
});

export const { addTask, removeTask, toggleTask, setPriority, setDueDate, selectTask, setReminder } = todoSlice.actions;
export default todoSlice.reducer;
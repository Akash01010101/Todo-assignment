# React Todo App with Redux

This is a simple React Todo app that uses Redux for state management. It allows users to add, edit, delete tasks, set due dates, and manage task priorities. It also features a weather widget to display the current weather and hourly forecast based on the user's location.

## Features

- **Task Management**: 
  - Add, edit, and delete tasks.
  - Mark tasks as completed.
  - Filter tasks based on priority or due date.
- **Due Date Management**:
  - Set and edit due dates for tasks.
- **Weather Widget**:
  - Displays the current weather and hourly forecast based on the user's geolocation.
- **Responsive UI**:
  - Fully responsive and works well on both desktop and mobile devices.

## Tech Stack

- **React**: Frontend framework.
- **Redux**: For state management.
- **Tailwind CSS**: For styling.
- **JavaScript (ES6+)**: For application logic.

## Getting Started

### Prerequisites

Before running the app, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (preferably the latest LTS version)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for managing dependencies.

### Clone the Repository

```bash
git clone https://github.com/Akash01010101/Todo-assignment
cd Todo-assignment
```

### Install the Dependencies

```bash
npm install
```

### Build the application

```bash
npm run build
```

### Start the application (Dev mode)

```bash
npm run dev
```

### Start the application (Preview mode)

```bash
npm run preview
```

## Features

### **Task Management**
- **Add a Task**:  
  Enter a task name and set a priority (low, medium, high). Click the "Add Task" button to save it.
- **Edit Task**:  
  Edit a task’s due date or priority from the task details view.
- **Delete Task**:  
  Remove a task from the list by clicking the "Delete" button.
- **Mark as Completed**:  
  Mark a task as completed by checking the checkbox next to the task.
- **Filter Tasks**:  
  Filter tasks based on priority or display tasks due today.

### **Weather Widget**
- Automatically fetches the user's location using the browser's geolocation API.
- Displays the current weather and an hourly forecast based on the user's location.

---

## Troubleshooting

### **Problem with Geolocation**
- If the browser does not support geolocation or if the user denies location access, the weather widget may not display correctly.

### **Redux Issues**
- Ensure that Redux is properly set up in your app.
- If you encounter issues, refer to the [Redux documentation](https://redux.js.org) or look into specific problems related to Redux DevTools.

---

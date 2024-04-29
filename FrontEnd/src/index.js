import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CalendarPage from './employee-calendar';
import TaskPage from './employee-tasks';
import NotificationPage from './employee-notifications';
import EmployeeTasksExpand from './employee-tasks-expand';
import { TimerProviderTasks } from './TimerContextTasks'; 
import { TimerProvider } from './TimerContext';
import DashboardPage from'./employee-dashboard';
import AdminPage from './admin';
import AccountForm from './admin-createAccount';
import ModifyForm from './admin-modifyAccount';
import Delete from './admin-deleteAccount';
import CreateForm from './admin-createTask';
import ModifyTask from './admin-modifyTask';
import DeleteTask from './admin-deleteTask';
import PostNotification from './admin-postNotification';

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />, 
  },
  {
    path: "/employee-calendar", 
    element: <CalendarPage />, 
  },
  {
    path: "/employee-tasks", 
    element: <TaskPage />, 
  },
  {
    path: "/employee-notifications", 
    element: <NotificationPage />,
  },
  {
    path: "/employee-tasks-expand/:taskId",
    element: <EmployeeTasksExpand />,
  },
  {
    path: "/employee-dashboard", 
    element: <DashboardPage />, 
  },
  {
    path: "/admin", 
    element: <AdminPage />, 
  },
  {
    path: "/create-account", 
    element: <AccountForm />,
  },
  {
    path: "/edit-account",
    element: <ModifyForm />,
  },
  {
    path:"/delete-account",
    element:<Delete />,
  },
  {
    path:"/create-task",
    element: <CreateForm />,
  },
  {
    path:"/edit-task",
    element:<ModifyTask />,
  },
  {
    path:"/delete-task",
    element:<DeleteTask />,
  },
  {
    path:"/create-notification", 
    element:<PostNotification />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TimerProvider> {/* Outermost provider to allow global access */}
      <TimerProviderTasks> {/* Second provider to manage task-specific timings */}
        <RouterProvider router={router}/>
      </TimerProviderTasks>
    </TimerProvider>
  </React.StrictMode>
);

// Performance measurement function
reportWebVitals();

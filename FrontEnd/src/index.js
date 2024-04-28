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
    path: "/employee-tasks-expand",
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

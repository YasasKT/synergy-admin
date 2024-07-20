import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import HomePage from "./client/pages/HomePage";
import AdminNotFound from "./admin/pages/AdminNotFound";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Profile from "./admin/pages/Profile";
import ClientNotFound from "./client/pages/ClientNotFound";
import Projects from "./admin/pages/Projects";
import Clients from "./admin/pages/Clients";
import Register from "./admin/pages/Register";
import AddEditProject from "./admin/pages/AddEditProject";
import AddEditClient from "./admin/pages/AddEditClient";
import { UserProvider } from "./admin/auth/UserProvider";
import Admins from "./admin/pages/Admins";
import Messages from "./admin/pages/Messages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ClientNotFound />,
  },
  {
    path: "admin/*",
    element: <AdminNotFound />,
  },
  {
    path: "/admin",
    element: (
      <UserProvider>
        <Dashboard />
      </UserProvider>
    ),
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/register",
    element: <Register />,
  },
  {
    path: "/admin/profile",
    element: (
      <UserProvider>
        <Profile />
      </UserProvider>
    ),
  },
  {
    path: "/admin/projects",
    element: (
      <UserProvider>
        <Projects />
      </UserProvider>
    ),
  },
  {
    path: "/admin/projects/add",
    element: (
      <UserProvider>
        <AddEditProject />
      </UserProvider>
    ),
  },
  {
    path: "/admin/projects/edit/:id",
    element: (
      <UserProvider>
        <AddEditProject />
      </UserProvider>
    ),
  },
  {
    path: "/admin/clients",
    element: (
      <UserProvider>
        <Clients />
      </UserProvider>
    ),
  },
  {
    path: "/admin/clients/add",
    element: (
      <UserProvider>
        <AddEditClient />
      </UserProvider>
    ),
  },
  {
    path: "/admin/clients/edit/:id",
    element: (
      <UserProvider>
        <AddEditClient />
      </UserProvider>
    ),
  },
  {
    path: "/admin/admins",
    element: (
      <UserProvider>
        <Admins />
      </UserProvider>
    ),
  },
  {
    path: "/admin/messages",
    element: (
      <UserProvider>
        <Messages />
      </UserProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import { User } from "../admin/models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, { ...init, credentials: "include" });
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users", {
    method: "GET",
  });
  return response.json();
}

export async function getAllUsers(): Promise<User[]> {
  const response = await fetchData("http://localhost:5000/api/users/admins", {
    method: "GET",
  });
  return response.json();
}

export interface SignUpCredentials {
  username: string;
  password: string;
  confirmPassword: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData("http://localhost:5000/api/users/logout", { method: "POST" });
}

export interface UpdateCredentials {
  username?: string;
  password: string;
  newPassword?: string;
  confirmPassword?: string;
}

export async function updateProfile(
  credentials: UpdateCredentials
): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/edit", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export async function deleteProfile() {
  await fetchData("http://localhost:5000/api/users/delete", {
    method: "DELETE",
  });
}

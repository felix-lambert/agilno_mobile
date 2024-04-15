import { User } from "./types";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

export async function updateUser(userId: string, data: User) {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update user");
  return response.json();
}

export async function addUser(data: User) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to add user");
  return response.json();
}

export async function deleteUser(userId: string) {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
  return userId;
}

export async function updateUserField(
  userId: string,
  field: string,
  value: string
) {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: value }),
  });
  if (!response.ok) throw new Error(`Failed to update user field: ${field}`);
  return response.json();
}

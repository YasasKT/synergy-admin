import { Client } from "../admin/models/client";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchClients(): Promise<Client[]> {
  const response = await fetchData("http://localhost:5000/api/clients", {
    method: "GET",
  });
  return response.json();
}

export async function fetchClient(clientId?: string): Promise<Client> {
  const response = await fetchData(
    "http://localhost:5000/api/clients/" + clientId,
    {
      method: "GET",
    }
  );
  return response.json();
}

export interface ClientInput {
  name: string;
  imageUrl?: string;
}

export async function createClient(client: FormData): Promise<Client> {
  const response = await fetchData("http://localhost:5000/api/clients", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: client,
  });
  return response.json();
}

export async function updateClient(
  clientId: string,
  client: FormData
): Promise<Client> {
  const response = await fetchData(
    "http://localhost:5000/api/clients/" + clientId,
    {
      method: "PATCH",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: client,
    }
  );
  return response.json();
}

export async function deleteClient(clientId: string) {
  await fetchData("http://localhost:5000/api/clients/" + clientId, {
    method: "DELETE",
  });
}

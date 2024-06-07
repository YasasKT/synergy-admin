export interface Project {
  _id: string;
  type: string;
  client: string;
  location: string;
  year: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

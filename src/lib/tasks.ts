import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in progress' | 'done';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getTasks() {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data.tasks;
}

export async function createTask(task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data.task;
}

export async function updateTask(taskId: string, task: Partial<Task>) {
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, task);
  return response.data.task;
}

export async function deleteTask(taskId: string) {
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
  return response.data;
}
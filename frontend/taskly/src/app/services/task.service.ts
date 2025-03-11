import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }
  
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
  
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }
  
  deleteTask(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
  
  getTasksByCompleted(completed: boolean): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/completed/${completed}`);
  }
  
  addCategoriesToTask(taskId: number, categoryIds: number[]): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${taskId}/categories`, categoryIds);
  }
  
  removeCategoryFromTask(taskId: number, categoryId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${taskId}/categories/${categoryId}`);
  }
  
}

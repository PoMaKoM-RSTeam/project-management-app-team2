import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SignUpResponse,
  Routes,
  SignUpDTO,
  BoardDTO,
  BoardResponse,
  ColumnResponse,
  ColumnDTO,
  UpdateColumnDTO,
  ColumnFromSetDTO,
  TaskResponse,
  TaskDTO,
  UpdateTaskDTO,
  UpdateTaskPositionDTO,
  FileResponse,
  PointDTO,
  PointResponse,
  UpdatePointsDTO,
  UpdatePointDTO,
} from '../models/project-manager.model';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  constructor(private http: HttpClient) { }

  // USER
  getAllUsers(): Observable<SignUpResponse[]> {
    return this.http.get<SignUpResponse[]>(`${Routes.AllUsers}`);
  }

  getUser(userId: string): Observable<SignUpResponse> {
    return this.http.get<SignUpResponse>(`${Routes.AllUsers}/${userId}`);
  }

  editUser(userId: string, user: SignUpDTO): Observable<SignUpResponse> {
    return this.http.put<SignUpResponse>(`${Routes.AllUsers}/${userId}`, user);
  }

  deleteUser(userId: string): Observable<SignUpResponse> {
    return this.http.delete<SignUpResponse>(`${Routes.AllUsers}/${userId}`);
  }

  // BOARDS
  getAllBoards(): Observable<BoardResponse[]> {
    return this.http.get<BoardResponse[]>(`${Routes.AllBoards}`);
  }

  getBoardById(boardId: string): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(`${Routes.AllBoards}/${boardId}`);
  }

  createBoard(board: BoardDTO): Observable<BoardResponse> {
    return this.http.post<BoardResponse>(`${Routes.AllBoards}`, board);
  }

  editBoard(boardId: string, board: BoardDTO): Observable<BoardResponse> {
    return this.http.put<BoardResponse>(`${Routes.AllBoards}/${boardId}`, board);
  }

  deleteBoard(boardId: string): Observable<BoardResponse> {
    return this.http.delete<BoardResponse>(`${Routes.AllBoards}/${boardId}`);
  }

  getBoardsSetByBoardIds(boardIds: string[]): Observable<BoardResponse[]> {
    return this.http.get<BoardResponse[]>(`${Routes.AllBoards}`, {
      params: new HttpParams()
        .set('ids', boardIds.join(',')),
    });
  }

  getBoardsSetByUserIds(userId: string): Observable<BoardResponse[]> {
    return this.http.get<BoardResponse[]>(`${Routes.AllBoards}/${userId}`);
  }

  // COLUMNS
  getAllColumns(boardId: string): Observable<ColumnResponse[]> {
    return this.http.get<ColumnResponse[]>(`${Routes.AllBoards}/${boardId}/${Routes.AllColumns}`);
  }

  createColumn(boardId: string, column: ColumnDTO): Observable<ColumnResponse> {
    return this.http.post<ColumnResponse>(`${Routes.AllBoards}/${boardId}/${Routes.AllColumns}`, column);
  }

  getColumn(boardId: string, columnId: string): Observable<ColumnResponse> {
    return this.http.get<ColumnResponse>(`${Routes.AllBoards}/${boardId}${Routes.AllColumns}/${columnId}`);
  }

  editColumn(boardId: string, columnId: string, column: ColumnDTO): Observable<BoardResponse> {
    return this.http.put<BoardResponse>(`${Routes.AllBoards}/${boardId}/${Routes.AllColumns}/${columnId}`, column);
  }

  deleteColumn(boardId: string, columnId: string): Observable<BoardResponse> {
    return this.http.delete<BoardResponse>(`${Routes.AllBoards}/${boardId}/${Routes.AllColumns}/${columnId}`);
  }

  getColumnsSetByColumnIds(userId: string, columnIds: string[]): Observable<ColumnResponse[]> {
    return this.http.get<ColumnResponse[]>(`${Routes.ColumnsSet}`, {
      params: new HttpParams()
        .set('ids', columnIds.join(','))
        .set('userId', userId),
    });
  }

  updateColumnsSet(columns: UpdateColumnDTO[]): Observable<ColumnResponse[]> {
    return this.http.patch<ColumnResponse[]>(`${Routes.ColumnsSet}`, columns);
  }

  createColumnsSet(columns: ColumnFromSetDTO[]): Observable<ColumnResponse[]> {
    return this.http.post<ColumnResponse[]>(`${Routes.ColumnsSet}`, columns);
  }

  // TASKS
  getAllTasks(boardId: string, columnId: string): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${Routes.AllBoards}/${boardId}${Routes.AllColumns}/${columnId}/${Routes.AllTasks}`);
  }

  createTask(boardId: string, columnId: string, task: TaskDTO): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(`${Routes.AllBoards}/${boardId}/${Routes.AllColumns}/${columnId}/${Routes.AllTasks}`, task);
  }

  getTask(boardId: string, columnId: string, taskId: string): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${Routes.AllBoards}/${boardId}${Routes.AllColumns}/${columnId}/${Routes.AllTasks}/${taskId}`);
  }

  updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    task: UpdateTaskDTO,
  ): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(
      `${Routes.AllBoards}/${boardId}${Routes.AllColumns}/${columnId}/${Routes.AllTasks}/${taskId}`,
      task,
    );
  }

  deleteTask(boardId: string, columnId: string, taskId: string): Observable<TaskResponse> {
    return this.http.delete<TaskResponse>(`${Routes.AllBoards}/${boardId}${Routes.AllColumns}/${columnId}/${Routes.AllTasks}/${taskId}`);
  }

  getTasksSet(tasksId: string[], userId: string, search: string): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${Routes.TasksSet}`, {
      params: new HttpParams()
        .set('ids', tasksId.join(','))
        .set('userId', userId)
        .set('search', search),
    });
  }

  updateTasksSet(updateTasks: UpdateTaskPositionDTO): Observable<TaskResponse[]> {
    return this.http.patch<TaskResponse[]>(`${Routes.TasksSet}`, updateTasks);
  }

  getTasksByBoardId(boardId: string): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${Routes.TasksSet}/${boardId}`);
  }

  // FILES
  getFiles(fileIds: string[], userId: string, taskId: string): Observable<FileResponse[]> {
    return this.http.get<FileResponse[]>(`${Routes.File}`, {
      params: new HttpParams()
        .set('ids', fileIds.join(','))
        .set('userId', userId)
        .set('taskId', taskId),
    });
  }

  createFile(boardId: string, taskId: string, file: File): Observable<FileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('boardId', boardId);
    formData.append('taskId', taskId);
    return this.http.post<FileResponse>(`${Routes.File}`, formData);
  }

  getFilesByBoardId(boardId: string): Observable<FileResponse[]> {
    return this.http.get<FileResponse[]>(`${Routes.File}/${boardId}`);
  }

  deleteFilesByBoardId(boardId: string): Observable<FileResponse[]> {
    return this.http.delete<FileResponse[]>(`${Routes.File}/${boardId}`);
  }

  // POINTS

  getUserPointsById(pointIds: string[], userId: string): Observable<PointResponse[]> {
    return this.http.get<PointResponse[]>(`${Routes.Points}`, {
      params: new HttpParams()
        .set('ids', pointIds.join(','))
        .set('userId', userId),
    });
  }

  createPoint(point: PointDTO): Observable<PointResponse> {
    return this.http.post<PointResponse>(`${Routes.Points}`, point);
  }

  updatePoints(updatePoints: UpdatePointsDTO[]): Observable<PointResponse[]> {
    return this.http.patch<PointResponse[]>(`${Routes.Points}`, updatePoints);
  }

  getPointsByTaskId(taskId: string): Observable<PointResponse[]> {
    return this.http.get<PointResponse[]>(`${Routes.Points}/${taskId}`);
  }

  updatePoint(pointId: string, updatePoint: UpdatePointDTO): Observable<PointResponse> {
    return this.http.patch<PointResponse>(`${Routes.Points}/${pointId}`, updatePoint);
  }

  deletePoint(pointId: string): Observable<PointResponse> {
    return this.http.delete<PointResponse>(`${Routes.Points}/${pointId}`);
  }
}

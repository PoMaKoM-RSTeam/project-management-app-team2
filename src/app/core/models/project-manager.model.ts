export enum Routes {
  SignIn = 'auth/signin',
  SignUp = 'auth/signup',
  AllUsers = 'users',
  AllBoards = 'boards',
  BoardsSet = 'boardsSet',
  AllColumns = 'columns',
  ColumnsSet = 'columnsSet',
  AllTasks = 'tasks',
  TasksSet = 'tasksSet',
  File = 'file',
  Points = 'points',
}
export enum StorageKeys {
  Token = 'token',
  UserName = 'name',
  Login = 'login',
  UserId = 'userId',
}

export interface ErrorResponse {
  statusCode: string,
  message: string,
}

export interface SignUpDTO {
  name: string,
  login: string,
  password: string,
}

export interface SignUpResponse {
  name: string,
  login: string,
  _id: string,
}

export interface SignInDTO {
  login: string,
  password: string,
}

export interface SignInResponse {
  token: string,
}

export interface BoardDTO {
  title: string,
  owner: string,
  users: string[],
}

export interface BoardResponse {
  _id: string,
  title: string,
  owner: string,
  users: string[],
}

export interface ColumnDTO {
  title: string;
  order: number;
}

export interface ColumnResponse {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks?: TaskResponse[];
}

export interface UpdateColumnDTO {
  _id: string;
  order: number;
}

export interface ColumnFromSetDTO {
  title: string;
  order: number;
  boardId: string;
}

export interface TaskDTO {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface TaskResponse {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface UpdateTaskDTO {
  title: string;
  order: number;
  description: string;
  columnId: string;
  userId: string;
  users: string[];
}

export interface UpdateTaskPositionDTO {
  title: string;
  order: number;
  columnId: string;
}

export interface FileDTO {
  boardId: string;
  taskId: string;
  file: File;
}

export interface FileResponse {
  _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

export interface PointDTO {
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}

export interface PointResponse {
  _id: string;
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}

export interface UpdatePointsDTO {
  _id: string;
  done: boolean;
}

export interface UpdatePointDTO {
  title: string;
  done: boolean;
}

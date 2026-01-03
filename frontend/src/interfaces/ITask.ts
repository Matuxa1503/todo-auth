import { IDate } from './IDate';

export interface ITask {
  id?: string;
  task: string;
  date: IDate;
  time: string;
  isCompleted: boolean;
}

// for update task
export interface ITaskDataPopup {
  id: number;
  date: IDate;
  time: string;
  title: string;
}

export interface ITaskDeleteArgs {
  uid: string;
  taskId: string;
}
export interface ITaskUpdateIconArgs extends ITaskDeleteArgs {
  isCompleted: boolean;
}

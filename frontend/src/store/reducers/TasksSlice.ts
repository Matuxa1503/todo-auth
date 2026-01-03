import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../interfaces/ITask';
import { addTask, deleteTask, fetchTasks } from './ActionCreators';

interface TasksState {
  tasks: ITask[];
  isLoading: boolean;
  isError: string;
}
// добавить еще поля isLoading, error когда будут запросы к серверу

const initialState: TasksState = {
  tasks: [
    // { id: Date.now() + 1, task: 'Gогулять', date: { day: 6, month: 'Aug', year: 2025 }, time: '12:25', isCompleted: false },
    // {
    //   id: Date.now(),
    //   task: 'Сходить в душ и погулять с собакой Рекс',
    //   date: { day: 1, month: 'Aug', year: 2025 },
    //   time: '12:00',
    //   isCompleted: false,
    // },
    // { id: Date.now() + 4, task: 'Eda', date: { day: 6, month: 'Aug', year: 2025 }, time: '9:25', isCompleted: false },
    // { id: Date.now() + 2, task: 'Сходить в магазин', date: { day: 3, month: 'May', year: 2025 }, time: '8:43', isCompleted: false },
    // {
    //   id: Date.now() + 3,
    //   task: 'Купить машину на барахолке у местного чувака',
    //   date: { day: 11, month: 'Jul', year: 2025 },
    //   time: '19:00',
    //   isCompleted: false,
    // },
  ],
  isLoading: false,
  isError: '',
};

export const TasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    completedTask(state, action: PayloadAction<{ taskId: string; isCompleted: boolean }>) {
      const task = state.tasks.find((item) => item.id === action.payload.taskId);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    updatedTask(state, action: PayloadAction<{ id: string; time: string; task: string }>) {
      const el = state.tasks.find((item) => item.id === action.payload.id);
      console.log(el);
      if (el) {
        el.task = action.payload.task;
        el.time = action.payload.time;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.isLoading = false;
        state.isError = '';
        state.tasks = action.payload.map((task) => ({
          ...task,
        }));
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || 'Ошибка при загрузке данных';
      })

      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || 'Ошибка при загрузке данных';
      })

      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((item) => item.id !== action.payload.taskId);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || 'Ошибка при загрузке данных';
      });
  },
});

export const { completedTask, updatedTask } = TasksSlice.actions;
export default TasksSlice.reducer;

import { FC } from 'react';
import s from './Plate.module.scss';
import { CircleCheckBig, Pencil, Trash2 } from 'lucide-react';
import { ITask } from '../../../interfaces/ITask';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { openPopupForEditTask } from '../../../store/reducers/PopupSlice';
import { completedTask } from '../../../store/reducers/TasksSlice';
import { deleteTask, toggleIconTask } from '../../../store/reducers/ActionCreators';
import { debounce } from 'lodash';

interface PlateProps {
  task: ITask;
}

export const Plate: FC<PlateProps> = ({ task }) => {
  const { uid } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  // const toggleIcon = debounce(() => {
  //   if (task.id) {
  //     const data = {
  //       taskId: task.id,
  //       isCompleted: !task.isCompleted,
  //     };

  //     dispatch(completedTask(data));
  //     dispatch(toggleIconTask({ uid, ...data }));
  //   }
  // }, 1000); остановился на изменении иконки выполнения задач с использованием debounce для оптимизации

  const handleUpdateTask = () => {
    const data = {
      id: task.id,
      time: task.time,
      title: task.task,
      date: task.date,
    };

    dispatch(openPopupForEditTask(data));
  };

  const handleDeleteTask = () => {
    if (task.id) dispatch(deleteTask({ uid, taskId: task.id }));
  };

  return (
    <div className={`${s.plate} ${task.isCompleted && s.scalePlate}`}>
      <div className={s.block}>
        <CircleCheckBig
          onClick={() => toggleIcon()}
          color={`${task.isCompleted ? '#39c4a5' : '#B1B1B1'}`}
          size={35}
          className={`${s.tick} ${task.isCompleted && s.fulfilledTick}`}
        />
        <p className={`${s.taskTitle} ${task.isCompleted && s.taskTitleCross}`}>{task.task}</p>
      </div>

      <div className={s.block}>
        <div className={`${s.date} ${task.isCompleted && s.blockDateCross}`}>{`${task.date.day} ${task.date.month}`}</div>
        <div className={`${task.isCompleted && s.blockDateCross}`}>{task.time}</div>
      </div>

      {!task.isCompleted && (
        <div className={s.exitBlock}>
          <button onClick={() => handleUpdateTask()} className={`${s.exitBtn} ${s.editBtn}`}>
            <Pencil className={s.iconBtn} color="#fff" size={27} />
          </button>
          <button onClick={() => handleDeleteTask()} className={`${s.exitBtn} ${s.trashBtn}`}>
            <Trash2 className={s.iconBtn} color="#fff" size={27} />
          </button>
        </div>
      )}
    </div>
  );
};

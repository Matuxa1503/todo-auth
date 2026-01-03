import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../src/firebase/config';
import { ITask, ITaskDeleteArgs, ITaskUpdateIconArgs } from '../src/interfaces/ITask';

export const createDocUserDB = async (uid: string, obj: ITask) => {
  try {
    return await addDoc(collection(db, 'users', uid, 'tasks'), obj);
  } catch (err) {
    console.error((err as Error).message);
  }
};

export const getDocsUserDB = async (uid: string) => {
  try {
    return await getDocs(collection(db, 'users', uid, 'tasks'));
  } catch (err) {
    console.error((err as Error).message);
  }
};

export const deleteDocUserDB = async ({ uid, taskId }: ITaskDeleteArgs) => {
  try {
    return await deleteDoc(doc(db, 'users', uid, 'tasks', taskId));
  } catch (err) {
    console.error((err as Error).message);
  }
};

export const toggleIconDocUserDB = async ({ uid, taskId, isCompleted }: ITaskUpdateIconArgs) => {
  try {
    return await updateDoc(doc(db, 'users', uid, 'tasks', taskId), { isCompleted: isCompleted });
  } catch (err) {
    console.error((err as Error).message);
  }
};

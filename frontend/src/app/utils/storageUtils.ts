import { storageKeys } from '../data';

export const getUserId = () => Number(localStorage.getItem(storageKeys.userId));

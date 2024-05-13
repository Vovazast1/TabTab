import { storageKeys } from './constants';

export { default as ActivityType } from './ActivityType';
export { default as DTOResponse } from './DTOResponse';
export { Intelligence, Sport } from './Type';
export type { default as Location } from './Location';
export type { default as Favorite } from './Favorite';
export type { default as User } from './User';
export const UserId = Number(localStorage.getItem(storageKeys.userId));
export * from './constants';

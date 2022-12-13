import { IAbsence } from './IAbsence';

export type UserRole = 'admin' | 'manager' | 'employee';

export interface IUser {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	roles: UserRole[];
	absences: IAbsence[];
}

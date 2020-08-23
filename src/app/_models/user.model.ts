import { Opps } from './opps.model';

export class User {
	id: number;
	name: string;
	username: string;
	email: string;
	token: string;
	
	college: string;
	year: number;
	branch: string;
	createdAt: string;
	updatedAt: string;
	bio: string;

	hasCompletedRegistration: boolean;
	tags: string[];

	followers: User[];
	following: User[];

	pursued: Opps[];

	isFollowed: boolean;
}

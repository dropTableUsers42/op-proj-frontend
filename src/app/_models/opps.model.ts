import { User } from './user.model';

export class Opps {
	public domain: string;

	public slug: string;
	public id: string;
	
	public Name_of_Program: string;
	
	public Organiser: string;

	public Type: string;
	
	public Location: string;
	
	public Deadline_Reg: string;

	public Deadline_Comp: string;

	public About: string;

	public Testimonials: string;

	public tags: Tag[];

	public Site: string;

	public isInWishlist: boolean;

	public numUsers: number;

	public comments: Comment[];
}

export class Tag  {
	public slug: string;
	public name: string;
}

export class Comment {
	public children: string[];
	public _id: string;
	public user: User;
	public parent: string;
	public data: string;
	public createdAt: Date;
}

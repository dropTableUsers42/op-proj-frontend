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

	public Testimonial: string;

	public tags: Tag[];

	public Site: string;

	public isInWishlist: boolean;

	public numUsers: number;
}

export class Tag  {
	public slug: string;
	public name: string;
}

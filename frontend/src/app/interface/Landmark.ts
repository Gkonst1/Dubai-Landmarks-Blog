export interface Landmark {
	objectId: string;
	title: string;
	short_info: string;
	description: string;
	order: number;
	url: string;
	photo: {
		url: string,
		name: string
	};
	location: Object;
	craetedAt: string;
	updatedAt: string;
}
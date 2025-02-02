export interface IUserAuth {
	id: number;
	image: string;
	accessToken: string;
	refreshToken: string;
	expirationTime?: number;
}

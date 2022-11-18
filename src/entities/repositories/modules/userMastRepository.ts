import { Scalars, UserMast } from "../../type";

export interface IUserMastRepository {
	addUserMast(input: UserMast): Promise<UserMast>;
	deletePost(userID: Scalars["ID"]): Promise<UserMast>;
	updateUserMast(input: UserMast): Promise<UserMast>;
	fetchUserMast(): Promise<UserMast | null>;
	fetchUserMastByUserID(userID: Scalars["ID"]): Promise<UserMast | null>;
	fetchAllUser(): Promise<UserMast[]>;
}

import { IUserMastRepository } from "./modules/userMastRepository";

export * from "./modules/userMastRepository";

export class RepositoryContainer {
	constructor(
		// entity
		public userMastRepository: IUserMastRepository
	) {}
}

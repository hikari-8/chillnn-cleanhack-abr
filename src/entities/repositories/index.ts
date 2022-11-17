import { IUserMastRepository } from "./modules/userMastRepository";
import { ICleanPlaceMastRepository } from "./modules/cleanPlaceMastRepository";

export * from "./modules/userMastRepository";
export * from "./modules/cleanPlaceMastRepository";

export class RepositoryContainer {
	constructor(
		// entity
		public userMastRepository: IUserMastRepository,
		public cleanPlaceMastRepository: ICleanPlaceMastRepository
	) {}
}

import { IUserMastRepository } from "./modules/userMastRepository";
import { ICleanPlaceMastRepository } from "./modules/cleanPlaceMastRepository";
import { IWeeklyRecordMastRepository } from "./modules/weeklyRecordMastRepository";

export * from "./modules/userMastRepository";
export * from "./modules/cleanPlaceMastRepository";
export * from "./modules/weeklyRecordMastRepository";

export class RepositoryContainer {
	constructor(
		// entity
		public userMastRepository: IUserMastRepository,
		public cleanPlaceMastRepository: ICleanPlaceMastRepository,
		public weeklyRecordMastRepository: IWeeklyRecordMastRepository
	) {}
}

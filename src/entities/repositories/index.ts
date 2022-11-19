import { IUserMastRepository } from "./modules/userMastRepository";
import { ICleanPlaceMastRepository } from "./modules/cleanPlaceMastRepository";
import { IWeeklyRecordMastRepository } from "./modules/weeklyRecordMastRepository";
import { IRoomMastRepository } from "./modules/roomMastRepository";

export * from "./modules/userMastRepository";
export * from "./modules/cleanPlaceMastRepository";
export * from "./modules/weeklyRecordMastRepository";
export * from "./modules/roomMastRepository";

export class RepositoryContainer {
	constructor(
		// entity
		public userMastRepository: IUserMastRepository,
		public cleanPlaceMastRepository: ICleanPlaceMastRepository,
		public weeklyRecordMastRepository: IWeeklyRecordMastRepository,
		public roomMastRepository: IRoomMastRepository
	) {}
}

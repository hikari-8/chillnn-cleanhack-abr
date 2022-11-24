import { IUserMastRepository } from "./modules/userMastRepository";
import { ITaskMasterObjectRepository } from "./modules/taskMasterObjectRepository";
import { IRaffleObjectRepository } from "./modules/raffleobjectRepository";
import { IGroupMastRepository } from "./modules/groupMastRepository";

export * from "./modules/userMastRepository";
export * from "./modules/taskMasterObjectRepository";
export * from "./modules/raffleobjectRepository";
export * from "./modules/groupMastRepository";

export class RepositoryContainer {
	constructor(
		// entity
		public userMastRepository: IUserMastRepository,
		public taskMasterObjectRepository: ITaskMasterObjectRepository,
		public raffleObjectRepository: IRaffleObjectRepository,
		public groupMastRepository: IGroupMastRepository
	) {}
}

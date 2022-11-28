import { IS3Repository } from "./modules/S3Repository";
import { IUserMastRepository } from "./modules/userMastRepository";
import { ITaskMasterObjectRepository } from "./modules/taskMasterObjectRepository";
import { IRaffleObjectRepository } from "./modules/raffleobjectRepository";
import { IGroupMastRepository } from "./modules/groupMastRepository";
export * from "./modules/S3Repository";
export * from "./modules/userMastRepository";
export * from "./modules/taskMasterObjectRepository";
export * from "./modules/raffleobjectRepository";
export * from "./modules/groupMastRepository";
export declare class RepositoryContainer {
    s3Repository: IS3Repository;
    userMastRepository: IUserMastRepository;
    taskMasterObjectRepository: ITaskMasterObjectRepository;
    raffleObjectRepository: IRaffleObjectRepository;
    groupMastRepository: IGroupMastRepository;
    constructor(s3Repository: IS3Repository, //
    userMastRepository: IUserMastRepository, taskMasterObjectRepository: ITaskMasterObjectRepository, raffleObjectRepository: IRaffleObjectRepository, groupMastRepository: IGroupMastRepository);
}

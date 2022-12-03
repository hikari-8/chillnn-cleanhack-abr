export * from "./modules/S3Repository";
export * from "./modules/userMastRepository";
export * from "./modules/taskMasterObjectRepository";
export * from "./modules/raffleobjectRepository";
export * from "./modules/groupMastRepository";
export class RepositoryContainer {
    constructor(
    // object
    s3Repository, //
    // entity
    userMastRepository, taskMasterObjectRepository, raffleObjectRepository, groupMastRepository) {
        this.s3Repository = s3Repository;
        this.userMastRepository = userMastRepository;
        this.taskMasterObjectRepository = taskMasterObjectRepository;
        this.raffleObjectRepository = raffleObjectRepository;
        this.groupMastRepository = groupMastRepository;
    }
}

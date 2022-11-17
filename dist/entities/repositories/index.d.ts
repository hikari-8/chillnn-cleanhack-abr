import { IUserMastRepository } from "./modules/userMastRepository";
import { ICleanPlaceMastRepository } from "./modules/cleanPlaceMastRepository";
export * from "./modules/userMastRepository";
export * from "./modules/cleanPlaceMastRepository";
export declare class RepositoryContainer {
    userMastRepository: IUserMastRepository;
    cleanPlaceMastRepository: ICleanPlaceMastRepository;
    constructor(userMastRepository: IUserMastRepository, cleanPlaceMastRepository: ICleanPlaceMastRepository);
}

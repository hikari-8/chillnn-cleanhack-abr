import { UserMast } from "../type";
import { RepositoryContainer } from "../repositories";
import { UserModel } from "./modules/userModel";
import { ModelOption } from "./modules/_baseModel";
export * from "./modules/userModel";
export declare class ModelFactory {
    private repositoryContainer;
    constructor(repositoryContainer: RepositoryContainer);
    UserModel(mast: UserMast, option?: ModelOption): UserModel;
    CleanPlaceModel(mast: UserMast, option?: ModelOption): UserModel;
}

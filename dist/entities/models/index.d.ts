import { GroupMast, UserMast, TaskMast, TaskMasterObject, RaffleObject, RaffleMast, RaffleJoinUser } from "../type";
import { RepositoryContainer } from "../repositories";
import { UserModel } from "./modules/userModel";
import { TaskMasterObjectModel } from "./modules/taskMasterObjectModel";
import { TaskMastModel } from "./modules/taskMastModel";
import { RaffleObjectModel } from "./modules/raffleObjectModel";
import { RaffleMastModel } from "./modules/raffleMastModel";
import { RaffleJoinUserModel } from "./modules/raffleJoinUserModel";
import { GroupModel } from "./modules/groupModel";
import { ModelOption } from "./modules/_baseModel";
export * from "./modules/userModel";
export * from "./modules/taskMasterObjectModel";
export * from "./modules/taskMastModel";
export * from "./modules/raffleObjectModel";
export * from "./modules/raffleMastModel";
export * from "./modules/raffleJoinUserModel";
export * from "./modules/groupModel";
export declare class ModelFactory {
    private repositoryContainer;
    constructor(repositoryContainer: RepositoryContainer);
    UserModel(mast: UserMast, option?: ModelOption): UserModel;
    GroupModel(mast: GroupMast, option?: ModelOption): GroupModel;
    TaskMasterObjectModel(mast: TaskMasterObject, option?: ModelOption): TaskMasterObjectModel;
    TaskMastModel(mast: TaskMast, option?: ModelOption): TaskMastModel;
    RaffleObjectModel(mast: RaffleObject, option?: ModelOption): RaffleObjectModel;
    RaffleMastModel(mast: RaffleMast, option?: ModelOption): RaffleMastModel;
    RaffleJoinUserModel(mast: RaffleJoinUser, option?: ModelOption): RaffleJoinUserModel;
}

import { UserModel } from "./modules/userModel";
import { TaskMasterObjectModel } from "./modules/taskMasterObjectModel";
import { TaskMastModel } from "./modules/taskMastModel";
import { RaffleObjectModel } from "./modules/raffleObjectModel";
import { RaffleMastModel } from "./modules/raffleMastModel";
import { RaffleJoinUserModel } from "./modules/raffleJoinUserModel";
import { GroupModel } from "./modules/groupModel";
import { BaseModel } from "./modules/_baseModel";
export * from "./modules/userModel";
export * from "./modules/taskMasterObjectModel";
export * from "./modules/taskMastModel";
export * from "./modules/raffleObjectModel";
export * from "./modules/raffleMastModel";
export * from "./modules/raffleJoinUserModel";
export * from "./modules/groupModel";
export class ModelFactory {
    constructor(repositoryContainer //
    ) {
        this.repositoryContainer = repositoryContainer;
    }
    UserModel(mast, option) {
        return new UserModel(mast, //
        this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }
    GroupModel(mast, option) {
        return new GroupModel(mast, //
        this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }
    TaskMasterObjectModel(mast, option) {
        return new TaskMasterObjectModel(mast, //
        this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }
    TaskMastModel(mast, option) {
        return new TaskMastModel(mast, //
        this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }
    RaffleObjectModel(mast, option) {
        return new RaffleObjectModel(mast, //
        this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }
    RaffleMastModel(mast, option) {
        return new RaffleMastModel(mast, //
        this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }
    RaffleJoinUserModel(mast, option) {
        return new RaffleJoinUserModel(mast, //
        this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }
}

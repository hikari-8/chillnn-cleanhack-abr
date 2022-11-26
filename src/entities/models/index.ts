import {
	GroupMast,
	UserMast,
	TaskMast,
	TaskMasterObject,
	RaffleObject,
	RaffleMast,
	RaffleJoinUser,
} from "../type";
import { RepositoryContainer } from "../repositories";
import { UserModel } from "./modules/userModel";
import { TaskMasterObjectModel } from "./modules/taskMasterObjectModel";
import { TaskMastModel } from "./modules/taskMastModel";
import { RaffleObjectModel } from "./modules/raffleObjectModel";
import { RaffleMastModel } from "./modules/raffleMastModel";
import { RaffleJoinUserModel } from "./modules/raffleJoinUserModel";
import { GroupModel } from "./modules/groupModel";
import { BaseModel, ModelOption } from "./modules/_baseModel";

export * from "./modules/userModel";
export * from "./modules/taskMasterObjectModel";
export * from "./modules/taskMastModel";
export * from "./modules/raffleObjectModel";
export * from "./modules/raffleMastModel";
export * from "./modules/raffleJoinUserModel";
export * from "./modules/groupModel";

export class ModelFactory {
	constructor(
		private repositoryContainer: RepositoryContainer //
	) {}

	public UserModel(mast: UserMast, option?: ModelOption) {
		return new UserModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}
	public GroupModel(mast: GroupMast, option?: ModelOption) {
		return new GroupModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}
	public TaskMasterObjectModel(mast: TaskMasterObject, option?: ModelOption) {
		return new TaskMasterObjectModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}
	public TaskMastModel(mast: TaskMast, option?: ModelOption) {
		return new TaskMastModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}

	public RaffleObjectModel(mast: RaffleObject, option?: ModelOption) {
		return new RaffleObjectModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}
	public RaffleMastModel(mast: RaffleMast, option?: ModelOption) {
		return new RaffleMastModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}
	public RaffleJoinUserModel(mast: RaffleJoinUser, option?: ModelOption) {
		return new RaffleJoinUserModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}
}

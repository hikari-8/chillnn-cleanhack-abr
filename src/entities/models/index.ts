import { GroupMast, UserMast } from "../type";
import { RepositoryContainer } from "../repositories";
import { UserModel } from "./modules/userModel";
import { TaskMasterObjectModel } from "./modules/taskMasterObjectModel";
import { RaffleModel } from "./modules/raffleModel";
import { GroupModel } from "./modules/groupModel";
import { BaseModel, ModelOption } from "./modules/_baseModel";

export * from "./modules/userModel";
export * from "./modules/taskMasterObjectModel";
export * from "./modules/raffleModel";
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
	public TaskMasterObjectModel(
		mast: TaskMasterObjectModel,
		option?: ModelOption
	) {
		return new TaskMasterObjectModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}
	public RaffleModel(mast: RaffleModel, option?: ModelOption) {
		return new RaffleModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}
}

import { UserMast } from "../type";
import { RepositoryContainer } from "../repositories";
import { UserModel } from "./modules/userModel";
import { CleanPlaceModel } from "./modules/cleanPlaceModel";
import { WeeklyRecordModel } from "./modules/weeklyRecordModel";
import { RoomModel } from "./modules/groupModel";
import { BaseModel, ModelOption } from "./modules/_baseModel";

export * from "./modules/userModel";
export * from "./modules/cleanPlaceModel";
export * from "./modules/weeklyRecordModel";
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
}

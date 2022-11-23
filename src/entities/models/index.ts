import { UserMast, CleanPlaceMast, WeeklyRecordMast, RoomMast } from "../type";
import { RepositoryContainer } from "../repositories";
import { UserModel } from "./modules/userModel";
import { CleanPlaceModel } from "./modules/cleanPlaceModel";
import { WeeklyRecordModel } from "./modules/weeklyRecordModel";
import { RoomModel } from "./modules/roomModel";
import { BaseModel, ModelOption } from "./modules/_baseModel";

export * from "./modules/userModel";
export * from "./modules/cleanPlaceModel";
export * from "./modules/weeklyRecordModel";
export * from "./modules/roomModel";

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
	public CleanPlaceModel(mast: CleanPlaceMast, option?: ModelOption) {
		return new CleanPlaceModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}
	public WeeklyRecordModel(mast: WeeklyRecordMast, option?: ModelOption) {
		return new WeeklyRecordModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}
	public RoomModel(mast: RoomMast, option?: ModelOption) {
		return new RoomModel(
			mast, //
			this.repositoryContainer,
			this,
			option || BaseModel.baseModelOption()
		);
	}
}

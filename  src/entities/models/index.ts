import { UserMast } from "../type";
import { RepositoryContainer } from "../repositories";
import { UserModel } from "./modules/userModel";
import { BaseModel, ModelOption } from "./modules/_baseModel";

export * from "./modules/userModel";

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

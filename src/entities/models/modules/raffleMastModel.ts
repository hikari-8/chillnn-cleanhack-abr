import { generateUUID } from "../../../util";
import { RaffleMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
import { UserModel } from "./userModel";

export class RaffleMastModel extends BaseModel<RaffleMast> {
	static getBlanc(
		taskID: Scalars["ID"],
		taskName: Scalars["String"],
		groupID: Scalars["ID"],
		headCount: Scalars["Int"],
		joinUserIDArray: Array<string>,
		optionName: Scalars["String"],
		optionValidUsers: Array<string>
	): RaffleMast {
		return {
			taskID,
			taskName,
			groupID,
			headCount,
			joinUserIDArray,
			optionName,
			optionValidUsers,
			raffleItemID: generateUUID(),
			createdAt: new Date().getTime(),
			updatedAt: new Date().getTime(),
		};
	}
	// ============================================
	// getters
	// ============================================

	get groupID() {
		return this.mast.groupID;
	}

	get createdAt() {
		return this.mast.createdAt;
	}
	get updatedAt() {
		return this.mast.updatedAt;
	}
	get deletedAt() {
		return this.mast.deletedAt;
	}

	// ============================================
	// getter / setter
	// ============================================
	get taskName() {
		return this.mast.taskName;
	}
	set taskName(input: string) {
		this.mast.taskName = input;
	}
	get headCount() {
		if (!this.mast.headCount) {
			this.mast.headCount = 0;
		}
		return this.mast.headCount;
	}
	set headCount(input: number) {
		this.mast.headCount = input;
	}

	get joinUserIDArray() {
		if (!this.mast.joinUserIDArray) {
			this.mast.joinUserIDArray = [];
		}
		return this.mast.joinUserIDArray;
	}

	set joinUserIDArray(input: string[]) {
		this.mast.joinUserIDArray = input;
	}

	get optionName() {
		if (!this.mast.optionName) {
			this.mast.optionName = "";
		}
		return this.mast.optionName;
	}

	set optionName(input: string) {
		this.mast.optionName = input;
	}

	get optionValidUsers() {
		if (!this.mast.optionValidUsers) {
			this.mast.optionValidUsers = [];
		}
		return this.mast.optionValidUsers;
	}

	set optionValidUsers(input: string[]) {
		this.mast.optionValidUsers = input;
	}

	// ============================================
	// validation
	// ============================================

	// ============================================
	// functions
	// ============================================
	/**
	 * RaffleMastModelをmastに解く関数
	 *
	 */
	async raffleMastModelToTaskMast() {
		return this.mast;
	}
}

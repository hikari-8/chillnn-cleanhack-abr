import { generateUUID } from "../../../util";
import { RaffleJoinUser, RaffleMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
import { UserModel } from "./userModel";

export class RaffleJoinUserModel extends BaseModel<RaffleJoinUser> {
	static getBlanc(
		userID: Scalars["ID"],
		groupID: Scalars["ID"]
	): RaffleJoinUser {
		return {
			userID,
			groupID,
			joinAt: new Date().getTime(),
		};
	}
	// ============================================
	// getters
	// ============================================

	get userID() {
		return this.mast.userID;
	}
	get groupID() {
		return this.mast.groupID;
	}

	get joinAt() {
		return this.mast.joinAt;
	}

	get deletedAt() {
		return this.mast.deletedAt;
	}

	// ============================================
	// getter / setter
	// ============================================

	// ============================================
	// validation
	// ============================================

	// ============================================
	// functions
	// ============================================
	/**
	 * mastに解く関数
	 */
	async raffleJoinUserModelToMast() {
		return this.mast;
	}
}

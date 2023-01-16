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
		headCount: Scalars["Int"]
		// userID: Array<string>
		// raffleID: Scalars["ID"]
	): RaffleMast {
		return {
			taskID,
			taskName,
			groupID,
			headCount,
			// userID,
			// raffleID,
			raffleItemID: generateUUID(),
			createdAt: new Date().getTime(),
			updatedAt: new Date().getTime(),
		};
	}
	// ============================================
	// getters
	// ============================================

	get raffleID() {
		return this.mast.groupID;
	}

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
		return this.mast.headCount || 0;
	}
	set headCount(input: number) {
		if (input) {
			this.mast.headCount = input;
		} else {
			this.mast.headCount = 0;
		}
	}
	get userID() {
		return this.mast.userID || [];
	}

	set userID(input: string[]) {
		this.mast.userID = input;
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

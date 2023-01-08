import { generateUUID } from "../../../util";
import { RaffleMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
import { UserModel } from "./userModel";

export class RaffleMastModel extends BaseModel<RaffleMast> {
	static getBlanc(
		groupID: Scalars["ID"],
		taskName: Scalars["String"]
	): RaffleMast {
		return {
			raffleItemID: generateUUID(),
			taskID: generateUUID(),
			taskName,
			groupID,
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
			this.mast.headCount = null;
		}
	}

	// ============================================
	// validation
	// ============================================

	// ============================================
	// functions
	// ============================================
}

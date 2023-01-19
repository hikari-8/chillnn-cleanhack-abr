import { generateUUID } from "../../../util";
import { RaffleJoinUser, RaffleMast, RaffleOption } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
import { UserModel } from "./userModel";

export class RaffleOptionModel extends BaseModel<RaffleOption> {
	static getBlanc(
		optionName: Scalars["String"],
		availableUsers: Array<string>
	): RaffleOption {
		return {
			optionName,
			availableUsers,
		};
	}
	// ============================================
	// getters
	// ============================================
	get optionName() {
		if (!this.mast.optionName) {
			this.mast.optionName = "";
		}
		return this.mast.optionName;
	}

	set optionName(input: string) {
		this.mast.optionName = input;
	}

	get availableUsers() {
		if (!this.mast.availableUsers) {
			this.mast.availableUsers = [];
		}
		return this.mast.availableUsers;
	}

	set availableUsers(input: string[]) {
		this.mast.availableUsers = input;
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
}

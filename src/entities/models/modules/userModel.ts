import { throws } from "assert";
import { UserMast } from "../../type";
import { CleanPlaceModel } from "./cleanPlaceModel";
import { Scalars } from "../..";
import { BaseModel } from "./_baseModel";

export class UserModel extends BaseModel<UserMast> {
	// ============================================
	// getters
	// ============================================
	get userID() {
		return this.mast.userID;
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
	get name() {
		return this.mast.name;
	}
	set name(input: string) {
		this.mast.name = input;
	}
	get role() {
		return this.mast.role || "";
	}
	set role(input: string) {
		this.mast.role = input;
	}
	// ============================================
	// getter / setter -not mandatory
	// ============================================
	//配列データを取ってくるだけ(ポインタを取得するだけ)
	get records() {
		return (this.mast.records = []);
	}

	set records(input: string[]) {
		this.mast.records = input;
	}

	// ============================================
	// validation
	// ============================================
	get isRegisterable() {
		return true;
	}
	get isAdmin() {
		return true;
	}
	// ============================================
	// functions
	// ============================================

	/**
	 * ユーザー情報を新規登録、または更新する
	 */
	async register() {
		if (this.isRegisterable) {
			const now = new Date().getTime();
			if (this.isNew) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				await this.repositoryContainer.userMastRepository.addUserMast(
					this.mast
				);
			} else {
				this.mast.updatedAt = now;
				await this.repositoryContainer.userMastRepository.updateUserMast(
					this.mast
				);
			}
			this.isNew = false;
		}
	}
}

import { throws } from "assert";
import { UserMast } from "../../type";
import { TaskMasterObjectModel } from "./taskMasterObjectModel";
import { Scalars } from "../..";
import { BaseModel } from "./_baseModel";
import { GroupModel } from "./groupModel";

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
	get email() {
		return this.mast.email;
	}
	set email(input: string) {
		this.mast.email = input;
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
	// ============================================
	// functions
	// ============================================
	public isAdmin() {
		if (this.mast.role === "admin") {
			return true;
		}
	}

	/**
	 * ユーザー情報を新規登録、または更新する
	 */
	async register() {
		if (this.isRegisterable) {
			const now = new Date().getTime();
			if (this.isNew && !this.isAdmin) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				await this.repositoryContainer.userMastRepository.addUserMast(
					this.mast
				);
			} else if (this.isNew) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				this.mast.role = "admin";
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

	/**
	 * Adminならグループを登録、更新できる
	 */
	// async groupRegister() {
	// 	if (this.isRegisterable) {
	// 		const now = new Date().getTime();
	// 		if (this.isNew && this.role !== "admin") {
	// 			return window.alert(
	// 				"管理者権限がありません。管理者に言って、Admin権限を付与してもらってください。"
	// 			);
	// 		} else if (this.isNew && this.role === "admin") {
	// 			this.mast.createdAt = now;
	// 			this.mast.updatedAt = now;
	// 			await this.createGroupModel();
	// 		} else {
	// 			this.mast.updatedAt = now;
	// 			await this.createGroupModel();
	// 		}
	// 		this.isNew = false;
	// 	}
	// }

	createGroupModel(groupName: string): GroupModel {
		const blank = GroupModel.getBlanc(groupName);
		return this.modelFactory.GroupModel(blank, {
			isNew: true,
		});
	}
}

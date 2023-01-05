import { GroupMast, TaskMast, TaskMasterObject } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
import { generateUUID } from "../../../util";

export class GroupModel extends BaseModel<GroupMast> {
	static getBlanc(createdUserID: Scalars["String"]): GroupMast {
		return {
			createdUserID,
			groupID: generateUUID(),
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
	get createdUserID() {
		return this.mast.createdUserID;
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
	get groupName() {
		return this.mast.groupName || "";
	}
	set groupName(input: string) {
		this.mast.groupName = input;
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

	/**
	 * グループを更新できる(後でフロントでroleの分岐作る)
	 *
	 */
	async updateGroupMast() {
		await this.repositoryContainer.groupMastRepository.updateGroup(
			this.mast
		);
	}

	/**
	 * このグループのマスターデータを取得する
	 * @returns
	 */
	async fetchTaskMasterObject(): Promise<TaskMasterObject | null> {
		const res =
			await this.repositoryContainer.taskMasterObjectRepository.fetchTaskMasterObject(
				this.groupID
			);
		return res;
		// mapメソッドを使おうとしたら、型が違うと怒られる'(TaskMasterObjectにModelFactoryからアクセスして入れることになる??)
	}
}

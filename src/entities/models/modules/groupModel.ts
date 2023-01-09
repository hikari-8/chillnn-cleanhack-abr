import {
	GroupMast,
	RaffleMast,
	RaffleObject,
	TaskMast,
	TaskMasterObject,
} from "../../type";
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

	get records() {
		if (this.mast.records) {
			return this.mast.records;
		} else {
			return [];
		}
	}

	set records(input: RaffleObject[]) {
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
	 * グループをfetchできる(後でフロントでroleの分岐作る)
	 *
	 */
	async fetchGroupMast(): Promise<GroupModel | null> {
		const groupMast =
			await this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(
				this.groupID
			);
		if (!groupMast) {
			return null;
		} else {
			const res = this.modelFactory.GroupModel(groupMast);
			return res;
		}
	}

	/**
	 * raffleDataを追加後のgroupDataにpushの処理
	 *
	 */
	async pushGroupRecord(input: RaffleObject) {
		this.records.push(input);
		//groupMastをupdateする
		await this.repositoryContainer.groupMastRepository.updateGroup(
			this.mast
		);
		console.log("GroupDataにpushしました→");
	}

	/**
	 * このグループのマスターデータを取得する //多分使えん(モデファク入れとらんけ)
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

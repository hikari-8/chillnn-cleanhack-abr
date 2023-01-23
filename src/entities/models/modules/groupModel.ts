import {
	GroupMast,
	RaffleJoinUser,
	RaffleMast,
	RaffleObject,
	TaskMast,
	TaskMasterObject,
} from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
import { generateUUID } from "../../../util";
import { RaffleObjectModel } from "./raffleObjectModel";

export class GroupModel extends BaseModel<GroupMast> {
	static getBlanc(createdUserID: Scalars["String"]): GroupMast {
		return {
			createdUserID,
			groupID: generateUUID(),
			members: [createdUserID],
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

	get members() {
		if (!this.mast.members) {
			this.mast.members = [];
		}
		return this.mast.members;
	}

	set members(input: string[]) {
		this.mast.members = input;
	}

	// get records() {
	// 	return this.mast.records;
	// }

	// set records(input: RaffleObject[]) {
	// 	this.mast.records = input;
	// }

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
	 * グループを新規登録、または更新する
	 */
	async register() {
		if (this.isRegisterable) {
			const now = new Date().getTime();
			if (this.isNew) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				await this.repositoryContainer.groupMastRepository.addGroup(
					this.mast
				);
			} else {
				this.mast.updatedAt = now;
				await this.repositoryContainer.groupMastRepository.updateGroup(
					this.mast
				);
			}
			this.isNew = false;
		}
	}

	/**
	 * Admin以外がgroupのparamsで入ってきた時、groupのmembersの配列にpushして、updateする
	 *
	 */
	async pushGroupMembers(userID: string) {
		this.mast.members.push(userID);
		await this.updateGroupMast();
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
	 * rafflesをgroupからfetchできる(後でフロントでroleの分岐作る)
	 * @returns
	 *
	 */
	async fetchRafflesByGroupID(): Promise<RaffleObjectModel[]> {
		const res =
			await this.repositoryContainer.raffleObjectRepository.fetchRafflesByGroupID(
				this.mast.groupID
			);
		return res.map((item) => this.modelFactory.RaffleObjectModel(item));
	}

	/**
	 * 全ての登録したくじの中で最後のくじをgorupIDでfetchできる
	 *@returns
	 */
	async fetchLastRaffleItemByGroupID(): Promise<RaffleObjectModel | null> {
		const lastItem =
			await this.repositoryContainer.raffleObjectRepository.fetchLastRaffleByGroupID(
				this.mast.groupID
			);
		if (!lastItem) {
			return null;
		} else {
			const res = this.modelFactory.RaffleObjectModel(lastItem);
			return res;
		}
	}

	/**
	 * raffleDataを追加後のgroupDataにpushの処理
	 *
	 */
	// public pushGroupRecord(input: RaffleObject) {
	// 	const groupMast = this.mast;
	// 	groupMast.records?.push(input);
	// 	//groupMastをupdateする
	// 	console.log("push直後のupdateされていないgroup:", groupMast);
	// 	this.repositoryContainer.groupMastRepository.updateGroup(groupMast);
	// 	console.log("GroupDataにpushしました→");
	// }

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

	/**
	 * groupのmodelをmastに解く関数
	 *
	 */
	async GroupModelToGroupMast() {
		return this.mast;
	}

	/**
	 * groupのmastをmodelに解く関数
	 *
	 */
	async GroupMastToGroupModel(input: GroupMast) {
		if (!input) {
			return null;
		}
		//modelFactoryに入れて、modelを作る
		const res = this.modelFactory.GroupModel(input);
		return res;
	}
}

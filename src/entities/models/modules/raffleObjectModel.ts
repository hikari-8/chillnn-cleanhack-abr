import {
	RaffleObject,
	RaffleMast,
	RaffleStatus,
	RaffleJoinUser,
} from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../..";
import { generateUUID } from "../../..";
import { RaffleMastModel } from "./raffleMastModel";
import { RaffleJoinUserModel } from "./raffleJoinUserModel";
import { GroupModel } from "./groupModel";

export class RaffleObjectModel extends BaseModel<RaffleObject> {
	static getBlanc(
		tasks: Array<RaffleMast>,
		groupID: Scalars["String"],
		limitTime: Scalars["String"],
		raffleStatus: RaffleStatus,
		remindSlackWeek: Scalars["String"],
		remindSlackTime: Scalars["String"],
		activeMembers: Array<RaffleJoinUser>
	): RaffleObject {
		return {
			raffleID: generateUUID(),
			tasks,
			groupID,
			limitTime,
			raffleStatus,
			remindSlackWeek,
			remindSlackTime,
			activeMembers,
			createdAt: new Date().getTime(),
			updatedAt: new Date().getTime(),
		};
	}

	// ============================================
	// getters
	// ============================================
	get raffleID() {
		return this.mast.raffleID;
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
	get limitTime() {
		return this.mast.limitTime || "";
	}

	set limitTime(input: string) {
		if (input) {
			this.mast.limitTime = input;
		} else {
			this.mast.limitTime = "";
		}
	}

	get raffleStatus() {
		return this.mast.raffleStatus;
	}

	// 引数見直した方がいいかも
	set raffleStatus(input: RaffleStatus) {
		if (input) {
			this.mast.raffleStatus = input;
		} else {
			return;
		}
	}

	get remindSlackWeek() {
		return this.mast.remindSlackWeek || "blanc";
	}

	set remindSlackWeek(input: string) {
		if (input) {
			this.mast.remindSlackWeek = input;
		} else {
			this.mast.remindSlackWeek = "blanc";
		}
	}

	get remindSlackTime() {
		return this.mast.remindSlackTime || "blanc";
	}

	set remindSlackTime(input: string) {
		if (input) {
			this.mast.remindSlackTime = input;
		} else {
			this.mast.remindSlackTime = "blanc";
		}
	}

	get tasks() {
		return this.mast.tasks;
	}

	set tasks(input: RaffleMast[]) {
		this.mast.tasks = input;
	}

	get activeMembers() {
		if (!this.mast.activeMembers) {
			this.mast.activeMembers = [];
		}
		return this.mast.activeMembers;
	}

	set activeMembers(input: RaffleJoinUser[]) {
		this.mast.activeMembers = input;
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

	get isDone() {
		return true;
	}

	/**
	 * ルームのそれぞれのくじのデータを一括で登録・編集する //後でroleで分岐作る
	 */
	async register() {
		if (this.isRegisterable) {
			const now = new Date().getTime();
			if (this.isNew) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				await this.repositoryContainer.raffleObjectRepository.addRaffleObject(
					this.mast
				);
			} else {
				this.mast.updatedAt = now;
				await this.repositoryContainer.raffleObjectRepository.updateRaffleObject(
					this.mast
				);
			}
			this.isNew = false;
		}
	}

	/**
	 * 全ての登録したくじをgorupIDでfetchできる(後でフロントでroleの分岐作る)
	 *@returns
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
		if (!this.mast.groupID) {
			return null;
		} else {
			const lastItem =
				await this.repositoryContainer.raffleObjectRepository.fetchLastRaffleByGroupID(
					this.mast.groupID
				);
			if (lastItem == null) {
				return null;
			} else {
				const res = this.modelFactory.RaffleObjectModel(lastItem);
				return res;
			}
		}
	}

	/**
	 * グループDataをfetchできる(後でフロントでroleの分岐作る)
	 *
	 */
	async fetchGroupMast(): Promise<GroupModel | null> {
		const groupMast =
			await this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(
				this.groupID
			);
		if (!groupMast) {
			console.error("GroupMast not found at fetchGroupMast");
			return null;
		} else {
			const res = this.modelFactory.GroupModel(groupMast);
			return res;
		}
	}

	/**
	 * raffleのmodelをmastに解く関数
	 *
	 */
	async raffleObjectModelToRaffleObject() {
		return this.mast;
	}

	// /**
	//  * raffleIDから、ルームの個々のデータを取得する
	//  * @returns
	//  */
	async fetchRaffleItem(): Promise<RaffleObjectModel | null> {
		const raffleItem =
			await this.repositoryContainer.raffleObjectRepository.fetchRaffleObject(
				this.raffleID
			);
		if (!raffleItem) {
			return null;
		} else {
			const res = this.modelFactory.RaffleObjectModel(raffleItem);
			return res;
		}
	}
}

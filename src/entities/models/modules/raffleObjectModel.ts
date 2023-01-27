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
		limitHour: Scalars["Int"],
		limitMin: Scalars["Int"],
		limitTimeUnix: Scalars["Int"],
		raffleStatus: RaffleStatus,
		remindSlackHour: Scalars["Int"],
		remindSlackMin: Scalars["Int"],
		remindTimeUnix: Scalars["Int"],
		channelID: Scalars["String"],
		activeMembers: Array<RaffleJoinUser>
	): RaffleObject {
		return {
			raffleID: generateUUID(),
			tasks,
			groupID,
			limitHour,
			limitMin,
			limitTimeUnix,
			raffleStatus,
			remindSlackHour,
			remindSlackMin,
			remindTimeUnix,
			channelID,
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

	get limitHour() {
		if (!this.mast.limitHour) {
			this.mast.limitHour = 0;
		}
		return this.mast.limitHour;
	}

	set limitHour(input: number) {
		this.mast.limitHour = input;
	}

	get limitMin() {
		if (!this.mast.limitMin) {
			this.mast.limitMin = 0;
		}
		return this.mast.limitMin;
	}

	set limitMin(input: number) {
		this.mast.limitMin = input;
	}

	get limitTimeUnix() {
		if (!this.mast.limitTimeUnix) {
			this.mast.limitTimeUnix = 0;
		}
		return this.mast.limitTimeUnix;
	}

	set limitTimeUnix(input: number) {
		this.mast.limitTimeUnix = input;
	}

	get remindSlackHour() {
		if (!this.mast.remindSlackHour) {
			this.mast.remindSlackHour = 0;
		}
		return this.mast.remindSlackHour;
	}

	set remindSlackHour(input: number) {
		this.mast.remindSlackHour = input;
	}

	get remindSlackMin() {
		if (!this.mast.remindSlackMin) {
			this.mast.remindSlackMin = 0;
		}
		return this.mast.remindSlackMin;
	}
	set remindSlackMin(input: number) {
		this.mast.remindSlackMin = input;
	}

	get remindTimeUnix() {
		if (!this.mast.remindTimeUnix) {
			this.mast.remindTimeUnix = 0;
		}
		return this.mast.remindTimeUnix;
	}

	set remindTimeUnix(input: number) {
		this.mast.remindTimeUnix = input;
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

	get channelID() {
		if (!this.mast.channelID) {
			this.mast.channelID = "";
		}
		return this.mast.channelID;
	}

	set channelID(input: string) {
		this.mast.channelID = input;
	}

	get resultMessage() {
		if (!this.mast.resultMessage) {
			this.mast.resultMessage = "";
		}
		return this.mast.resultMessage;
	}

	set resultMessage(input: string) {
		this.mast.resultMessage = input;
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
	 * 全ての登録したくじをgorupIDでfetchできる
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
	 * グループDataをfetchできる
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

	/**
	 * raffleからuserModelをとってくるための関数(serverで使用)
	 *
	 */
	async fetchUserModelToGetBlanc() {
		//1番目のjoinuserのuserIDを借りる
		const groupMast =
			await this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(
				this.mast.groupID
			);
		const userID = groupMast?.createdUserID;
		const userData =
			await this.repositoryContainer.userMastRepository.fetchUserMastByUserID(
				userID!
			);
		if (userData == null) {
			return null;
		}
		const res = this.modelFactory.UserModel(userData);
		return res;
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

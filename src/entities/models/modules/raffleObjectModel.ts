import { RaffleObject, RaffleMast, RaffleStatus } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../..";
import { generateUUID } from "../../..";
import { RaffleMastModel } from "./raffleMastModel";
import { RaffleJoinUserModel } from "./raffleJoinUserModel";

export class RaffleObjectModel extends BaseModel<RaffleObject> {
	static getBlanc(
		tasks: Array<RaffleMast>,
		groupID: Scalars["String"],
		limitTime: Scalars["AWSTimestamp"],
		raffleStatus: RaffleStatus,
		remindSlackWeek: Scalars["String"],
		remindSlackTime: Scalars["AWSTimestamp"]
	): RaffleObject {
		return {
			raffleID: generateUUID(),
			tasks,
			groupID,
			limitTime,
			raffleStatus,
			remindSlackWeek,
			remindSlackTime,
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
		return this.mast.limitTime || 0;
	}

	set limitTime(input: number) {
		if (input) {
			this.mast.limitTime = input;
		} else {
			this.mast.limitTime = 0;
		}
	}

	get raffleStatus() {
		return this.mast.raffleStatus;
	}

	// 引数見直した方がいいかも
	set raffleStatus(input: string) {
		if (this.isNew) {
			this.mast.raffleStatus === "EFFECTIVE";
		} else if (this.isDone) {
			this.mast.raffleStatus === "DONE";
		} else {
			this.mast.raffleStatus === "EFFECTIVE_AND_FIXED";
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
		return this.mast.remindSlackWeek || "blanc";
	}

	set remindSlackTime(input: string) {
		if (input) {
			this.mast.remindSlackWeek = input;
		} else {
			this.mast.remindSlackWeek = "blanc";
		}
	}

	get tasks() {
		return (this.mast.tasks = []);
	}

	set tasks(input: RaffleMast[]) {
		this.mast.tasks = input;
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
	 * ルームのそれぞれのくじのデータを一括で登録・編集する
	 */
	async register() {
		if (this.isRegisterable && this.isAdmin) {
			const now = new Date().getTime();
			if (this.isNew) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				await this.repositoryContainer.raffleObjectRepository.addRaffleObject(
					this.mast
				);
			}
			// else {
			// 	this.mast.updatedAt = now;
			// 	await this.repositoryContainer.raffleObjectRepository.updateRaffleObject(
			// 		this.mast
			// 	);
			// }
			this.isNew = false;
		}
	}

	// /**
	//  * グループIDから、ルームの個々のデータを取得する
	//  * @returns
	//  */
	async fetchRaffle(groupID: string) {
		const res =
			await this.repositoryContainer.raffleObjectRepository.fetchRaffleObject(
				this.groupID
			);
		// return res.map((item) => this.modelFactory.RaffleMastModel(item));
	}

	// raffleObjectがraffleMastを保持していることを明示する(別のクラスが別のクラスを保持している)
	// getRaffleMastModel(raffleID: string) {
	// 	const blank = RaffleMastModel.getBlanc(this.raffleID, "blanc");
	// 	return this.modelFactory.RaffleMastModel(blank, { isNew: true });
	// }

	// raffleObjectがraffleJoinUserを保持していることを明示する(別のクラスが別のクラスを保持している)
	// getRaffleJoinUserModel(groupID: string) {
	// 	const blank = RaffleJoinUserModel.getBlanc(this.groupID, "blanc");
	// 	return this.modelFactory.RaffleJoinUserModel(blank, { isNew: true });
	// }
}

import { RaffleObject, RaffleMast, RaffleStatus } from "../../type";
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
		remindSlackTime: Scalars["String"]
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
			this.mast.raffleStatus === input;
		} else {
			this.mast.raffleStatus === RaffleStatus.EFFECTIVE;
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
	 * ルームのそれぞれのくじのデータを一括で登録・編集する //後でroleで分岐作る
	 *
	 */
	// async addNewRaffle() {

	// 	if (!groupData) return console.error("No group found");
	// 	let lastItemStatus = groupData.records?.slice(-1)[0].raffleStatus;
	// 	console.log(
	// 		"groupData.records?.slice(-1)[0]:",
	// 		groupData.records?.slice(-1)[0],
	// 		"groupData.records",
	// 		groupData.records
	// 	);
	// 	if (
	// 		groupData.records !== null &&
	// 		lastItemStatus !== RaffleStatus.DONE
	// 	) {
	// 		console.log(
	// 			"records:",
	// 			groupData.records,
	// 			"lastItemStatus:",
	// 			lastItemStatus
	// 		);
	// 		return alert(
	// 			"すでにくじが実行中です。実行中のくじを削除したい場合は、グループ欄からくじを削除してください"
	// 		);
	// 	} else {
	// 		//くじを新規作成
	// 		return this.register();
	// 	}
	// fetchする
	// const newRaffle =
	// 	await this.repositoryContainer.raffleObjectRepository.fetchRaffleObject(
	// 		this.raffleID
	// 	);
	// console.log("登録後fetchしたraffle:", newRaffle);
	// register&fetchしたraffleをgroupのrecords末尾にも追加
	// if (!newRaffle) {
	// 	return console.error("raffle is not fetched after register");
	// }
	// groupData.records!.push(newRaffle);
	// //groupMastをupdateする
	// await this.repositoryContainer.groupMastRepository.updateGroup(
	// 	groupData
	// );
	// }

	/**
	 * raffleDataを追加後のgroupDataにpushの処理
	 *
	 */
	// async pushGroupRecord() {
	// 	// fetchする
	// 	const newRaffle =
	// 		await this.repositoryContainer.raffleObjectRepository.fetchRaffleObject(
	// 			this.raffleID
	// 		);
	// 	console.log("登録後fetchしたraffle:", newRaffle);
	// 	//register&fetchしたraffleをgroupのrecords末尾にも追加
	// 	const groupData =
	// 		await this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(
	// 			this.groupID
	// 		);
	// 	if (!groupData) return console.error("No group found");
	// 	if (!newRaffle) {
	// 		return console.error("raffle is not fetched after register");
	// 	}
	// 	groupData.records!.push(newRaffle);
	// 	//groupMastをupdateする
	// 	await this.repositoryContainer.groupMastRepository.updateGroup(
	// 		groupData
	// 	);
	// 	console.log("GroupDataにpushしました→", groupData);
	// }

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
			console.log("res at getchGroupMast", res);
			return res;
		}
	}

	/**
	 * raffleのmodelをmastに解く関数
	 *
	 */
	async RaffleObjectModelToGroupObject() {
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

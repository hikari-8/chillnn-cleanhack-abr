import {
	TaskMasterObject,
	TaskMast,
	RaffleStatus,
	RaffleMast,
} from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../..";
import { generateUUID } from "../../..";
import { TaskMastModel } from "./taskMastModel";
import { RaffleObjectModel } from "./raffleObjectModel";
import { RaffleMastModel } from "./raffleMastModel";

export class TaskMasterObjectModel extends BaseModel<TaskMasterObject> {
	static getBlanc(
		groupID: Scalars["String"],
		tasks: Array<TaskMast>
	): TaskMasterObject {
		return {
			tasks,
			groupID,
			createdAt: new Date().getTime(),
			updatedAt: new Date().getTime(),
			taskMasterObjectID: generateUUID(),
		};
	}
	// ============================================
	// getters
	// ============================================

	get groupID() {
		return this.mast.groupID;
	}
	get taskMasterObjectID() {
		return this.mast.taskMasterObjectID;
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

	get remindSlackWeek() {
		return this.mast.remindSlackWeek || "blanc";
	}

	set remindSlackWeek(input: string) {
		if (input) {
			this.mast.remindSlackWeek = input;
		} else {
			this.mast.remindSlackWeek = null;
		}
	}

	get remindSlackTime() {
		return this.mast.remindSlackTime || "blanc";
	}

	set remindSlackTime(input: string) {
		if (input) {
			this.mast.remindSlackTime = input;
		} else {
			this.mast.remindSlackTime = null;
		}
	}

	get tasks() {
		return this.mast.tasks;
	}

	set tasks(input: TaskMast[]) {
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
	// ============================================
	// functions
	// ============================================
	/**
	 * 掃除場所情報を新規登録、または更新できる/ !roleがAdminかどうか後で分岐を作るべき
	 *
	 */
	async updateTaskMasterObj() {
		this.mast.updatedAt = new Date().getTime();
		await this.repositoryContainer.taskMasterObjectRepository.updateTaskMasterObject(
			this.mast
		);
	}

	// taskObjectがtaskMastを保持していることを明示する(別のクラスが別のクラスを保持している)
	getTaskMastModel(groupID: string) {
		const blank = TaskMastModel.getBlanc(this.groupID, "blanc", 0);
		return this.modelFactory.TaskMastModel(blank, { isNew: true });
	}

	/**
	 * くじの初期化オブジェクトを作成する
	 *
	 */
	getRaffleModel() {
		//taskが持ってる配列を一つづつ取り出して、raffleMに入れる
		const taskArray = this.tasks;
		// 新しいMastを作成する
		const newTaskArray: RaffleMast[] = taskArray.map((task) =>
			RaffleMastModel.getBlanc(
				task.taskID,
				task.taskName,
				task.groupID,
				task.headCount
			)
		);
		const status: RaffleStatus = RaffleStatus.EFFECTIVE;
		const raffleMemberBlanc = [
			{ userID: "blank", groupID: "blank", joinAt: 11111 },
		];

		//くじたちのMastを作成する
		const blankRaffle = RaffleObjectModel.getBlanc(
			newTaskArray,
			this.groupID,
			this.limitTime,
			status,
			this.remindSlackWeek,
			this.remindSlackTime,
			raffleMemberBlanc
		);
		console.log("blancRaffle: ", blankRaffle);
		return this.modelFactory.RaffleObjectModel(blankRaffle, {
			isNew: true,
		});
	}
	/**
	 * このグループのくじデータをくじのuuidで取得する
	 * @returns
	 */
	async fetchRaffleItemByRaffleID(
		raffleID: string
	): Promise<RaffleObjectModel | null> {
		if (!raffleID) {
			return null;
		} else {
			const raffleItem =
				await this.repositoryContainer.raffleObjectRepository.fetchRaffleObject(
					raffleID
				);
			if (!raffleItem) {
				return null;
			}
			//modelFactoryに入れて、modelを作る
			const res = this.modelFactory.RaffleObjectModel(raffleItem);
			return res;
		}
	}
}

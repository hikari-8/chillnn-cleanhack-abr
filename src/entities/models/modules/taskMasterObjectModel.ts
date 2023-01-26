import {
	TaskMasterObject,
	TaskMast,
	RaffleStatus,
	RaffleMast,
	TaskStatus,
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

	set remindTimeUnix(input: number) {
		this.mast.remindTimeUnix = input;
	}

	get remindTimeUnix() {
		if (!this.mast.remindTimeUnix) {
			this.mast.remindTimeUnix = 0;
		}
		return this.mast.remindTimeUnix;
	}

	get channelID() {
		if (!this.mast.channelID) {
			this.mast.channelID = "";
		}
		return this.mast.channelID;
	}

	set slackURL(input: string) {
		this.mast.channelID = input;
	}

	get tasks() {
		if (!this.mast.tasks) {
			this.mast.tasks = [];
		}
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
		const blank = TaskMastModel.getBlanc(this.groupID, "blanc", 0, "");
		return this.modelFactory.TaskMastModel(blank, { isNew: true });
	}

	/**
	 * くじの初期化オブジェクトを作成する
	 *
	 */
	async getRaffleModel() {
		//taskが持ってる配列を一つづつ取り出して、raffleMに入れる
		//mastのfilterかけたものにする
		const taskArray = await this.filterActiveTasksMast();

		// 新しいMastを作成する
		const newTaskArray: RaffleMast[] = taskArray.map((task) =>
			RaffleMastModel.getBlanc(
				task.taskID,
				task.taskName,
				task.groupID,
				task.headCount,
				[],
				task.optionItem,
				[]
			)
		);
		const status: RaffleStatus = RaffleStatus.EFFECTIVE;

		//くじたちのMastを作成する
		const blankRaffle = RaffleObjectModel.getBlanc(
			newTaskArray,
			this.groupID,
			this.limitHour,
			this.limitMin,
			this.limitTimeUnix,
			status,
			this.remindSlackHour,
			this.remindSlackMin,
			this.remindTimeUnix,
			this.slackURL,
			[]
		);
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

	/**
	 * このグループのtasksから、statusがdeletedを省いて返す
	 *
	 */
	async filterActiveTasks() {
		const tasks = this.mast.tasks;
		const res = tasks.filter(function (task) {
			return task.taskStatus === TaskStatus.ACTIVE;
		});
		return res.map((item) => this.modelFactory.TaskMastModel(item));
	}

	/**
	 * このグループのtasksから、statusがdeletedを省いて返す(mastで返す版)
	 *
	 */
	async filterActiveTasksMast() {
		const tasks = this.mast.tasks;
		const res = tasks.filter(function (task) {
			return task.taskStatus === TaskStatus.ACTIVE;
		});
		return res;
	}
}

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
		return this.mast.limitTime || 0;
	}

	set limitTime(input: number) {
		if (input) {
			this.mast.limitTime = input;
		} else {
			this.mast.limitTime = null;
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
		const blank = TaskMastModel.getBlanc(this.groupID, "blanc");
		return this.modelFactory.TaskMastModel(blank, { isNew: true });
	}

	/**
	 * くじの初期化オブジェクトを作成する
	 *
	 */
	getRaffleModel() {
		//taskが持ってる配列を一つづつ取り出して、raffleMに入れる
		const taskArray = this.tasks;
		console.log("taskArray: ", taskArray);
		// 新しいMastを作成する
		const newTaskArray: RaffleMast[] = taskArray.map((task) =>
			RaffleMastModel.getBlanc(task.taskName, task.groupID)
		);
		console.log("newTaskArray: ", newTaskArray);
		const status: RaffleStatus = RaffleStatus.EFFECTIVE;
		//くじたちのMastを作成する
		const blankRaffle = RaffleObjectModel.getBlanc(
			newTaskArray,
			this.groupID,
			this.limitTime,
			status,
			this.remindSlackWeek,
			this.remindSlackTime
		);
		console.log("blancRaffle: ", blankRaffle);

		const blankMasterData = TaskMasterObjectModel.getBlanc(
			this.groupID,
			taskArray
		);
		console.log("マスターデータのmastです: ", blankMasterData);
		const test = this.modelFactory.TaskMasterObjectModel(blankMasterData, {
			isNew: true,
		});
		console.log("testの返却値です", test);
		return this.modelFactory.RaffleObjectModel(blankRaffle, {
			isNew: true,
		});
	}

	/**
	 * くじの初期化オブジェクトを作成する(test)
	 *
	 */
	getRaffleModelTest() {
		//taskが持ってる配列を一つづつ取り出して、raffleに入れる
		const taskArray = this.tasks.map((task) =>
			RaffleMastModel.getBlanc(task.taskName, task.groupID)
		);
		console.log("newTaskArray: ", taskArray);
		const status: RaffleStatus = RaffleStatus.EFFECTIVE;
		//くじたちのMastを作成する
		const newRaffle = RaffleObjectModel.getBlanc(
			taskArray,
			this.groupID,
			this.limitTime,
			status,
			this.remindSlackWeek,
			this.remindSlackTime
		);

		const blankMasterData = TaskMasterObjectModel.getBlanc(
			this.groupID,
			this.tasks
		);
		console.log("マスターデータのmast: ", blankMasterData);
		console.log("newRaffle: ", newRaffle);
		const newRaffleModel = this.modelFactory.RaffleObjectModel(newRaffle, {
			isNew: true,
		});

		const res = JSON.parse(JSON.stringify(newRaffleModel));
		console.log("JSONに変換したblankRaffle/ res: ", res);
		return res;
	}
}

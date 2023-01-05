import { TaskMasterObject, TaskMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../..";
import { generateUUID } from "../../..";
import { TaskMastModel } from "./taskMastModel";

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
		return this.mast.remindSlackWeek || "blanc";
	}

	set remindSlackTime(input: string) {
		if (input) {
			this.mast.remindSlackWeek = input;
		} else {
			this.mast.remindSlackWeek = null;
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
	 * roleがAdminなら、掃除場所情報を新規登録、または更新できる
	 *
	 */
	async register() {
		if (this.isRegisterable && this.isAdmin) {
			const now = new Date().getTime();
			if (this.isNew) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				await this.repositoryContainer.taskMasterObjectRepository.addTaskMasterObject(
					this.mast
				);
			} else {
				this.mast.updatedAt = now;
				await this.repositoryContainer.taskMasterObjectRepository.updateTaskMasterObject(
					this.mast
				);
			}
			this.isNew = false;
		}
	}

	/**
	 * TaskMasterObjectのtaskspropertyに入れるmastを作成するために、TaskMastModelをmastに解く関数
	 *
	 */
	// async taskMastModelToTaskMast(
	// 	input: TaskMastModel
	// ): Promise<TaskMast | null> {
	// 	let res = input.mast;
	// 	return res;
	// }

	/**
	 * roleがAdminなら、掃除場所情報を新規登録、または更新できる
	 *
	 */
	// async updateTaskMasterObj(input: TaskMasterObjectModel) {
	// 	await this.repositoryContainer.taskMasterObjectRepository.updateTaskMasterObject(
	// 		input
	// 	);
	// }

	// /**
	//  * グループIDから、ルームの個々のデータを取得する
	//  * @returns
	//  */
	// async fetchTasks(): Promise<TaskMastModel[]> {
	// 	const res =
	// 		await this.repositoryContainer.taskMasterObjectRepository.fetchTasksByGroupID(
	// 			this.groupID
	// 		);
	// 	return res.map((item) => this.modelFactory.TaskMastModel(item));
	// }

	// taskObjectがtaskMastを保持していることを明示する(別のクラスが別のクラスを保持している)
	getTaskMastModel(groupID: string) {
		const blank = TaskMastModel.getBlanc(this.groupID, "blanc");
		return this.modelFactory.TaskMastModel(blank, { isNew: true });
	}
}

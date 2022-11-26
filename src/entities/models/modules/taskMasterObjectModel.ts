import { TaskMasterObject, TaskMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { UserMast } from "../../type";
import { UserModel } from "./userModel";
import { Scalars } from "../..";
import { generateUUID } from "../../..";

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
		};
	}
	// ============================================
	// getters
	// ============================================

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
	// get placeName() {
	// 	return this.mast.placeName;
	// }
	// set placeName(input: string) {
	// 	this.mast.placeName = input;
	// }
	// get headCount() {
	// 	return this.mast.headCount || 0;
	// }
	// set headCount(input: number) {
	// 	if (input) {
	// 		this.mast.headCount = input;
	// 	} else {
	// 		this.mast.headCount = null;
	// 	}
	// }

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
	get tasks() {
		return (this.mast.tasks = []);
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

	// /**
	//  * ルームの全てのデータを取得する
	//  * @returns
	//  */
	// async fetchAllTaskMasterObjectsDataBygroupID(
	// 	input: string
	// ): Promise<TaskMasterObjectModel[]> {
	// 	const res =
	// 		await this.repositoryContainer.TaskMasterObjectMastRepository.fetchTaskMasterObjectsByRoomID(
	// 			this.groupID
	// 		);
	// 	return res.map((item) => this.modelFactory.TaskMasterObjectModel(item));
	// }

	// /**
	//  * ルームの個々のデータを取得する
	//  * @returns
	//  */
	// async fetchTaskMasterObjectDataByTaskMasterObjectID(
	// 	input: string
	// ): Promise<TaskMasterObjectModel> {
	// 	const res =
	// 		await this.repositoryContainer.TaskMasterObjectMastRepository.fetchTaskMasterObjectByTaskMasterObjectID(
	// 			this.TaskMasterObjectID
	// 		);
	// 	return this.modelFactory.TaskMasterObjectModel(res);
	// }
}

import { generateUUID } from "../../../util";
import { TaskMast, TaskStatus } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
import { UserModel } from "./userModel";

export class TaskMastModel extends BaseModel<TaskMast> {
	static getBlanc(
		groupID: Scalars["ID"],
		taskName: Scalars["String"],
		headCount: Scalars["Int"],
		optionItem: Scalars["String"]
	): TaskMast {
		return {
			taskID: generateUUID(),
			taskName,
			groupID,
			headCount,
			taskStatus: TaskStatus.ACTIVE,
			optionItem,
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
	get taskID() {
		return this.mast.taskID;
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
	get taskName() {
		return this.mast.taskName;
	}
	set taskName(input: string) {
		this.mast.taskName = input;
	}
	get headCount() {
		return this.mast.headCount || 0;
	}
	set headCount(input: number) {
		if (input) {
			this.mast.headCount = input;
		} else {
			this.mast.headCount = 0;
		}
	}

	get optionItem() {
		if (!this.mast.optionItem) {
			this.mast.optionItem = "";
		}
		return this.mast.optionItem;
	}

	set optionItem(input: string) {
		this.mast.optionItem = input;
	}

	get taskStatus() {
		return this.mast.taskStatus;
	}

	// 引数見直した方がいいかも
	set taskStatus(input: TaskStatus) {
		if (input) {
			this.mast.taskStatus = input;
		} else {
			return;
		}
	}

	// ============================================
	// validation
	// ============================================

	// ============================================
	// functions
	// ============================================
	/**
	 * TaskMasterObjectのtaskspropertyに入れるmastを作成するために、TaskMastModelをmastに解く関数
	 *
	 */
	async taskMastModelToTaskMast() {
		return this.mast;
	}
}

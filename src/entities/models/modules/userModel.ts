import { throws } from "assert";
import { UserMast, TaskMast } from "../../type";
import { TaskMasterObjectModel } from "./taskMasterObjectModel";
import { Scalars } from "../..";
import { BaseModel } from "./_baseModel";
import { GroupModel } from "./groupModel";
import { TaskMastModel } from "./taskMastModel";
import { generateUUID } from "../../../util";

export class UserModel extends BaseModel<UserMast> {
	// ============================================
	// getters
	// ============================================
	get userID() {
		return this.mast.userID;
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
	get name() {
		return this.mast.name;
	}
	set name(input: string) {
		this.mast.name = input;
	}
	get email() {
		return this.mast.email;
	}
	set email(input: string) {
		this.mast.email = input;
	}

	get role() {
		return this.mast.role || "";
	}
	set role(input: string) {
		this.mast.role = input;
	}
	// ============================================
	// getter / setter -not mandatory
	// ============================================
	//配列データを取ってくるだけ(ポインタを取得するだけ)
	get records() {
		return (this.mast.records = []);
	}

	set records(input: string[]) {
		this.mast.records = input;
	}

	// ============================================
	// validation
	// ============================================
	get isRegisterable() {
		return true;
	}
	// ============================================
	// functions
	// ============================================
	public isAdmin() {
		if (this.mast.role === "admin") {
			return true;
		}
	}

	/**
	 * ユーザー情報を新規登録、または更新する
	 */
	async register() {
		if (this.isRegisterable) {
			const now = new Date().getTime();
			if (this.isNew && !this.isAdmin) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				await this.repositoryContainer.userMastRepository.addUserMast(
					this.mast
				);
			} else if (this.isNew) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				this.mast.role = "admin";
				await this.repositoryContainer.userMastRepository.addUserMast(
					this.mast
				);
			} else {
				this.mast.updatedAt = now;
				await this.repositoryContainer.userMastRepository.updateUserMast(
					this.mast
				);
			}
			this.isNew = false;
		}
	}

	/**
	 * グループを更新できる(後でroleで分岐作る)
	 *
	 */
	async updateGroupMast() {
		const groupModel =
			await this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(
				this.groupID!
			);
		const now = new Date().getTime();
		groupModel!.updatedAt = now;
		await this.repositoryContainer.groupMastRepository.updateGroup(
			groupModel!
		);
	}

	/**
	 * このグループのグループデータを取得する
	 * @returns
	 */
	async fetchGroupDataByGroupID(input: string): Promise<GroupModel | null> {
		if (!this.groupID) {
			return null;
		} else {
			const groupData =
				await this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(
					this.groupID
				);
			const res = await this.modelFactory.GroupModel(groupData!);
			return res;
		}
	}
	/**
	 * このグループのtaskMastObjectデータを配列で初期化する,
	 * いらんかもこのメソッド
	 * @returns
	 */
	createTaskMast(): TaskMastModel {
		const res = this.modelFactory.TaskMastModel(
			TaskMastModel.getBlanc(this.groupID!, "")
		);
		return res;
	}

	/**
	 * このグループのtaskMastObjectデータを配列で初期化する
	 * @returns
	 */
	async createNewTaskMasterObj(): Promise<TaskMasterObjectModel> {
		const taskID = generateUUID();
		const groupID = this.groupID;
		return this.modelFactory.TaskMasterObjectModel(
			TaskMasterObjectModel.getBlanc(this.groupID!, [
				{
					groupID: groupID!,
					createdAt: new Date().getTime(),
					updatedAt: new Date().getTime(),
					taskID: taskID,
					taskName: "",
				},
			])
		);
	}

	/**
	 * マスターデータを更新できる(後でroleで分岐作る)
	 *
	 */
	async updateTaskMasterObj() {
		if (this.groupID == null) {
			return console.error("groupIDがnullです");
		}
		const taskMasterObjModel =
			await this.repositoryContainer.taskMasterObjectRepository.fetchTaskMasterObject(
				this.groupID
			);
		const now = new Date().getTime();
		taskMasterObjModel!.updatedAt = now;
		await this.repositoryContainer.taskMasterObjectRepository.updateTaskMasterObject(
			taskMasterObjModel!
		);
	}

	/**
	 * このグループのtaskMasterデータを取得する
	 * @returns
	 */
	async fetchTaskMasterDataObjByGroupID(
		input: string
	): Promise<TaskMasterObjectModel | null> {
		if (!this.groupID) {
			return null;
		} else {
			const now = new Date().getTime();
			const taskMasterObjectData =
				await this.repositoryContainer.taskMasterObjectRepository.fetchTaskMasterObject(
					this.groupID
				);
			const res = await this.modelFactory.TaskMasterObjectModel(
				taskMasterObjectData!
			);
			return res;
		}
	}
}

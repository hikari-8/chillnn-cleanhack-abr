import { throws } from "assert";
import { UserMast, TaskMast, GroupMast, TaskStatus } from "../../type";
import { TaskMasterObjectModel } from "./taskMasterObjectModel";
import { Scalars } from "../..";
import { BaseModel } from "./_baseModel";
import { GroupModel } from "./groupModel";
import { TaskMastModel } from "./taskMastModel";
import { generateUUID } from "../../../util";
import { RaffleJoinUserModel } from "./raffleJoinUserModel";

export class UserModel extends BaseModel<UserMast> {
	// ============================================
	// getters
	// ============================================
	get userID() {
		return this.mast.userID;
	}
	get groupID() {
		return this.mast.groupID || "";
	}
	//groupIDをフロントでセットする必要があるため書いている
	set groupID(input: string) {
		this.mast.groupID = input;
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

	// ============================================
	// functions -User
	// ============================================
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
	 * 別のuserのデータを取得する
	 * @returns
	 */
	async fetchUserDataByUserID(userID: string): Promise<UserModel | null> {
		if (!userID) {
			return null;
		} else {
			const userData =
				await this.repositoryContainer.userMastRepository.fetchUserMastByUserID(
					userID
				);
			if (userData == null) {
				return null;
			}
			const res = this.modelFactory.UserModel(userData);
			return res;
		}
	}

	// ============================================
	// functions -Group
	// ============================================

	// /**
	//  * グループを更新できる(後でroleで分岐作る)
	//  *
	//  */
	// async updateGroupMast(input: GroupMast) {
	// 	await this.repositoryContainer.groupMastRepository.updateGroup(input);
	// }

	/**
	 * グループの初期化データを作成する
	 * @returns
	 */
	createNewGroup(): GroupModel {
		return this.modelFactory.GroupModel(GroupModel.getBlanc(this.userID), {
			isNew: true,
		});
	}

	/**
	 * このグループのグループデータを取得する
	 * @returns
	 */
	async fetchGroupDataByGroupID(): Promise<GroupModel | null> {
		if (!this.mast.groupID) {
			return null;
		} else {
			const groupData =
				await this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(
					this.mast.groupID
				);
			if (groupData == null) {
				return null;
			}
			const res = this.modelFactory.GroupModel(groupData);
			return res;
		}
	}

	// ============================================
	// functions -TaskMasterObject
	// ============================================
	/**
	 * このグループのtaskMastObjectデータを配列で初期化する
	 * @returns
	 */
	createTaskMast(): TaskMastModel {
		const res = this.modelFactory.TaskMastModel(
			TaskMastModel.getBlanc(this.groupID!, "", 0)
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
		const now = new Date().getTime();
		return this.modelFactory.TaskMasterObjectModel(
			TaskMasterObjectModel.getBlanc(this.groupID!, [
				{
					groupID: groupID!,
					createdAt: now,
					updatedAt: now,
					taskID: taskID,
					taskName: "",
					headCount: 0,
					taskStatus: TaskStatus.ACTIVE,
				},
			])
		);
	}

	/**
	 * このグループのtaskMasterデータを取得する
	 * @returns
	 */
	async fetchTaskMasterDataObjByGroupID(
		groupID: string
	): Promise<TaskMasterObjectModel | null> {
		if (!groupID) {
			return null;
		} else {
			const taskMasterObjectData =
				await this.repositoryContainer.taskMasterObjectRepository.fetchTaskMasterObject(
					groupID
				);
			if (!taskMasterObjectData) {
				return null;
			}
			//modelFactoryに入れて、modelを作る
			const res =
				this.modelFactory.TaskMasterObjectModel(taskMasterObjectData);
			return res;
		}
	}

	/**
	 * このグループのrafflejoinuserデータのインスタンス作成
	 * @returns
	 */
	createRaffleJoinUser(): RaffleJoinUserModel {
		const res = this.modelFactory.RaffleJoinUserModel(
			RaffleJoinUserModel.getBlanc(this.mast.userID, this.mast.groupID!)
		);
		return res;
	}
}

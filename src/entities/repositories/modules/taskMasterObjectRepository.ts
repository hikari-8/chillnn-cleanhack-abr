import { Scalars, TaskMasterObject, TaskMast } from "../../type";

export interface ITaskMasterObjectRepository {
	//マスターデータの新規作成・更新
	addTaskMasterObject(input: TaskMasterObject): Promise<TaskMasterObject>;
	// updateTaskMasterObject(input: TaskMasterObject): Promise<TaskMasterObject>;

	fetchTaskMasterObject(
		groupID: Scalars["ID"]
	): Promise<TaskMasterObject | null>;

	// グループIDからタスクのマスターデータを取得する
	// fetchTasksByGroupID(groupID: Scalars["ID"]): Promise<TaskMast[]>;

	// addTaskMast(input: TaskMast): Promise<TaskMast>;
	// updateTaskMast(input: TaskMast): Promise<TaskMast>;
}

import { Scalars, TaskMasterObject, TaskMast } from "../../type";

export interface ITaskMasterObjectRepository {
	//マスターデータの新規作成・更新
	addTaskMasterObject(input: TaskMasterObject): Promise<TaskMasterObject>;
	updateTaskMasterObject(input: TaskMasterObject): Promise<TaskMasterObject>;

	//taskIDから個別のタスクを新規作成・更新・削除する
	addTaskMast(input: TaskMast): Promise<TaskMast>;
	updateTaskMast(input: TaskMast): Promise<TaskMast>;
	deleteTaskMast(taskID: Scalars["ID"]): Promise<TaskMast>;

	//taskIDから個別のタスクをfetchする
	fetchTaskMast(taskID: Scalars["ID"]): Promise<TaskMast>;

	// グループIDからタスクのマスターデータを取得する
	fetchTaskMasterObjectByGroupID(
		groupID: Scalars["ID"]
	): Promise<TaskMasterObject | null>;
}

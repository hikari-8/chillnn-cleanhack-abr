import { Scalars, TaskMasterObject, TaskMast } from "../../type";

export interface ITaskMasterObjectRepository {
	//マスターデータの新規作成・更新
	addTaskMasterObject(input: TaskMasterObject): Promise<TaskMasterObject>;
	updateTaskMasterObject(input: TaskMasterObject): Promise<TaskMasterObject>;
	fetchTaskMasterObject(
		groupID: Scalars["ID"]
	): Promise<TaskMasterObject | null>;
}

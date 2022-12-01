import { Scalars, TaskMasterObject } from "../../type";
export interface ITaskMasterObjectRepository {
    addTaskMasterObject(input: TaskMasterObject): Promise<TaskMasterObject>;
    fetchTaskMasterObject(groupID: Scalars["ID"]): Promise<TaskMasterObject | null>;
}

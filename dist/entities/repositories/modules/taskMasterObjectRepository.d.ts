import { Scalars, TaskMasterObject, TaskMast } from "../../type";
export interface ITaskMasterObjectRepository {
    addTaskMasterObject(input: TaskMasterObject): Promise<TaskMasterObject>;
    updateTaskMasterObject(input: TaskMasterObject): Promise<TaskMasterObject>;
    fetchTasksByGroupID(groupID: Scalars["ID"]): Promise<TaskMast[]>;
}

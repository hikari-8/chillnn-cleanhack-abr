import { ITaskMasterObjectRepository, TaskMast } from "../../entities";
import { TaskMasterObject } from "../../entities";
declare type TaskMastGroupCache = {
    [groupID: string]: {
        [taskID: string]: {
            mast: TaskMast;
            createdAt: number;
        };
    };
};
declare type TaskMastTaskCache = {
    [taskID: string]: {
        mast: TaskMast;
        createdAt: number;
    };
};
export declare class TaskMasterObjectRepositoryCacheAdaptor implements ITaskMasterObjectRepository {
    private repository;
    private groupCache;
    private taskCache;
    constructor(repository: ITaskMasterObjectRepository, optional?: {
        companyCache: TaskMastGroupCache;
        taskCache: TaskMastTaskCache;
    });
    addTaskMasterObject(input: TaskMasterObject): Promise<TaskMasterObject>;
    fetchTaskMasterObject(groupID: string): Promise<TaskMasterObject | null>;
    fetchTasksByGroupID(groupID: string): Promise<TaskMast[]>;
    private updateGroupCache;
    private updateGroupCacheByGroupID;
    private fetchCacheTaskMasterObject;
}
export {};

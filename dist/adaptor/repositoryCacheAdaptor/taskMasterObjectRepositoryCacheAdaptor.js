"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMasterObjectRepositoryCacheAdaptor = void 0;
const util_1 = require("../../util");
class TaskMasterObjectRepositoryCacheAdaptor {
    constructor(repository, optional) {
        this.repository = repository;
        this.groupCache = optional?.companyCache || {};
        this.taskCache = optional?.taskCache || {};
    }
    async addTaskMasterObject(input) {
        const res = await this.repository.addTaskMasterObject(input);
        res.createdAt = new Date().getDate();
        res.updatedAt = new Date().getDate();
        this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
        return res;
    }
    async updateTaskMasterObject(input) {
        const res = await this.repository.updateTaskMasterObject(input);
        res.updatedAt = new Date().getDate();
        this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
        return res;
    }
    async fetchTasksByGroupID(groupID) {
        const GroupCache = this.groupCache[groupID];
        if (GroupCache)
            return (Object.keys(GroupCache) || [])
                .map((key) => this.groupCache[groupID][key].mast)
                .sort((a, b) => util_1.compareNumDesc(a.updatedAt, b.updatedAt));
        return (Object.keys(GroupCache) || [])
            .map((key) => this.groupCache[groupID][key].mast)
            .sort((a, b) => util_1.compareNumDesc(a.updatedAt, b.updatedAt));
    }
    // ===============================================================
    //
    // private
    //
    // ===============================================================
    updateGroupCache(groupID, tasks, createdAt) {
        //groupCacheに保存
        this.groupCache[groupID] = {};
        tasks.forEach((task) => {
            this.groupCache[task.groupID][task.taskID] = {
                mast: task,
                createdAt,
            };
            this.taskCache[task.taskID] = { mast: task, createdAt };
        });
    }
}
exports.TaskMasterObjectRepositoryCacheAdaptor = TaskMasterObjectRepositoryCacheAdaptor;

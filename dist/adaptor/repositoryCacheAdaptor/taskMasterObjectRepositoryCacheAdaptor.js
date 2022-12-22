"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMasterObjectRepositoryCacheAdaptor = void 0;
const util_1 = require("../../util");
class TaskMasterObjectRepositoryCacheAdaptor {
    constructor(repository, optional) {
        this.repository = repository;
        this.groupCache = (optional === null || optional === void 0 ? void 0 : optional.companyCache) || {};
        this.taskCache = (optional === null || optional === void 0 ? void 0 : optional.taskCache) || {};
    }
    addTaskMasterObject(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.addTaskMasterObject(input);
            res.createdAt = new Date().getDate();
            res.updatedAt = new Date().getDate();
            this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
            return res;
        });
    }
    // async updateTaskMasterObject(
    // 	input: TaskMasterObject
    // ): Promise<TaskMasterObject> {
    // 	const res = await this.repository.updateTaskMasterObject(input);
    // 	res.updatedAt = new Date().getDate();
    // 	this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
    // 	return res;
    // }
    fetchTaskMasterObject(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = this.fetchCacheTaskMasterObject(groupID);
            if (cache) {
                return null;
            }
            else if (cache) {
                return cache;
            }
            const res = yield this.repository.fetchTaskMasterObject(groupID);
            this.updateGroupCacheByGroupID(groupID);
            return res;
        });
    }
    fetchTasksByGroupID(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const GroupCache = this.groupCache[groupID];
            if (GroupCache)
                return (Object.keys(GroupCache) || [])
                    .map((key) => this.groupCache[groupID][key].mast)
                    .sort((a, b) => (0, util_1.compareNumDesc)(a.updatedAt, b.updatedAt));
            return (Object.keys(GroupCache) || [])
                .map((key) => this.groupCache[groupID][key].mast)
                .sort((a, b) => (0, util_1.compareNumDesc)(a.updatedAt, b.updatedAt));
        });
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
    //とりま簡易的に設置しているけど、後で見返した方が良さそう
    updateGroupCacheByGroupID(groupID) {
        this.groupCache[groupID] = {};
        if (!this.groupCache)
            return;
    }
    fetchCacheTaskMasterObject(groupID) {
        return this.groupCache[groupID];
    }
}
exports.TaskMasterObjectRepositoryCacheAdaptor = TaskMasterObjectRepositoryCacheAdaptor;

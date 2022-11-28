"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaffleObjectRepositoryCacheAdaptor = void 0;
class RaffleObjectRepositoryCacheAdaptor {
    constructor(repository, optional) {
        this.repository = repository;
        this.groupCache = optional?.companyCache || {};
        this.taskCache = optional?.taskCache || {};
    }
    async addRaffleObject(input) {
        const res = await this.repository.addRaffleObject(input);
        res.createdAt = new Date().getDate();
        res.updatedAt = new Date().getDate();
        this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
        return res;
    }
    async updateRaffleObject(input) {
        const res = await this.repository.updateRaffleObject(input);
        res.updatedAt = new Date().getDate();
        this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
        return res;
    }
    async fetchRaffleObject(groupID) {
        const cache = this.fetchCacheRaffleObject(groupID);
        if (cache) {
            return null;
        }
        else if (cache) {
            return cache;
        }
        const res = await this.repository.fetchRaffleObject(groupID);
        this.updateRaffleCacheByGroupID(groupID);
        return res;
    }
    // async fetchRaffleTasksByGroupID(groupID: string): Promise<RaffleMast[]> {
    // 	const GroupCache = this.groupCache[groupID];
    // 	if (GroupCache)
    // 		return (Object.keys(GroupCache) || [])
    // 			.map((key) => this.groupCache[groupID][key].mast)
    // 			.sort((a, b) => compareNumDesc(a.updatedAt, b.updatedAt));
    // 	return (Object.keys(GroupCache) || [])
    // 		.map((key) => this.groupCache[groupID][key].mast)
    // 		.sort((a, b) => compareNumDesc(a.updatedAt, b.updatedAt));
    // }
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
    updateRaffleCacheByGroupID(groupID) {
        this.groupCache[groupID] = {};
        if (!this.groupCache)
            return;
    }
    fetchCacheRaffleObject(groupID) {
        return this.groupCache[groupID];
    }
}
exports.RaffleObjectRepositoryCacheAdaptor = RaffleObjectRepositoryCacheAdaptor;

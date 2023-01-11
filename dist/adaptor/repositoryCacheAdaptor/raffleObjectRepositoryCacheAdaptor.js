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
exports.RaffleObjectRepositoryCacheAdaptor = void 0;
const util_1 = require("../../util");
class RaffleObjectRepositoryCacheAdaptor {
    constructor(repository, optional) {
        this.repository = repository;
        this.groupCache = (optional === null || optional === void 0 ? void 0 : optional.companyCache) || {};
        this.taskCache = (optional === null || optional === void 0 ? void 0 : optional.taskCache) || {};
    }
    addRaffleObject(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.addRaffleObject(input);
            res.createdAt = new Date().getDate();
            res.updatedAt = new Date().getDate();
            this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
            return res;
        });
    }
    updateRaffleObject(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.updateRaffleObject(input);
            res.updatedAt = new Date().getDate();
            this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
            return res;
        });
    }
    fetchRaffleObject(raffleID) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = this.fetchCacheRaffleObject(raffleID);
            if (cache) {
                return null;
            }
            else if (cache) {
                return cache;
            }
            const res = yield this.repository.fetchRaffleObject(raffleID);
            this.updateRaffleCacheByGroupID(raffleID);
            return res;
        });
    }
    //超適当キャッシュ
    fetchRafflesByGroupID(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.fetchRafflesByGroupID(groupID);
            return res;
            // const cache = this.fetchRaffles(groupID);
            // if (cache) return cache;
            // const res = await this.repository.fetchRafflesByGroupID(groupID);
            // this.addcacheBulk(groupID, res);
            // return res.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
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
    // private addCacheEach(raffleID: Scalars["ID"], raffle: RaffleObject | null) {
    // 	this.taskCache[raffleID] = raffle || "blanc";
    // 	if (!raffle) return;
    // 	const groupCache = this.groupCache[raffle.raffleID];
    // 	if (groupCache) {
    // 		groupCache[raffleID] = raffle;
    // 	}
    // }
    // private addCacheBulk(groupID: Scalars["ID"], raffles: RaffleObject[]) {
    // 	this.groupCache[groupID] = {};
    // 	for (const raffle of raffles) {
    // 		this.addCacheEach(raffle.raffleID, raffle);
    // 	}
    // }
    //とりま簡易的に設置しているけど、後で見返した方が良さそう
    updateRaffleCacheByGroupID(raffleID) {
        this.groupCache[raffleID] = {};
        if (!this.groupCache)
            return;
    }
    fetchCacheRaffleObject(groupID) {
        return this.groupCache[groupID];
    }
    fetchRaffles(groupID) {
        const groupCache = this.groupCache[groupID];
        if (!groupCache)
            return null;
        return (Object.keys(groupCache)
            .map((key) => {
            return groupCache[key];
        })
            // .filter((item) => !item.deletedAt)
            .sort((a, b) => (0, util_1.compareNumDesc)(a.createdAt, b.createdAt)));
    }
}
exports.RaffleObjectRepositoryCacheAdaptor = RaffleObjectRepositoryCacheAdaptor;

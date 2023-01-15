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
    constructor(repository) {
        this.repository = repository;
        //後で名前raffleCacheに変える
        this.groupCache = {};
        this.raffleCache = {};
    }
    addRaffleObject(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.addRaffleObject(input);
            res.createdAt = new Date().getDate();
            res.updatedAt = new Date().getDate();
            this.addCacheEach(res.raffleID, res);
            return res;
        });
    }
    updateRaffleObject(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.updateRaffleObject(input);
            res.updatedAt = new Date().getDate();
            this.addCacheEach(res.raffleID, res);
            return res;
        });
    }
    fetchRaffleObject(raffleID) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = this.fetchCacheRaffleObject(raffleID);
            if (cache && cache === "blanc") {
                return null;
            }
            else if (cache) {
                return cache;
            }
            const res = yield this.repository.fetchRaffleObject(raffleID);
            this.addCacheEach(raffleID, res);
            return res;
        });
    }
    fetchRafflesByGroupID(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = this.fetchRaffles(groupID);
            if (cache)
                return cache;
            const res = yield this.repository.fetchRafflesByGroupID(groupID);
            this.addCacheBulk(groupID, res);
            return res.sort((a, b) => (0, util_1.compareNumDesc)(a.createdAt, b.createdAt));
        });
    }
    fetchLastRaffleByGroupID(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = this.fetchCacheRaffleObjectByGroupID(groupID);
            if (cache && cache === "blanc") {
                return null;
            }
            else if (cache) {
                return cache;
            }
            const res = yield this.repository.fetchLastRaffleByGroupID(groupID);
            if (!res) {
                return null;
            }
            else {
                this.addCacheEach(res.raffleID, res);
                return res;
            }
        });
    }
    // ===============================================================
    //
    // private
    //
    // ===============================================================
    addCacheEach(raffleID, raffle) {
        this.raffleCache[raffleID] = raffle || "blanc";
        if (!raffle)
            return;
        const groupCache = this.groupCache[raffle.raffleID];
        if (groupCache) {
            groupCache[raffleID] = raffle;
        }
    }
    addCacheBulk(groupID, raffles) {
        this.groupCache[groupID] = {};
        for (const raffle of raffles) {
            this.addCacheEach(raffle.raffleID, raffle);
        }
    }
    fetchCacheRaffleObject(raffleID) {
        return this.raffleCache[raffleID];
    }
    fetchCacheRaffleObjectByGroupID(groupID) {
        return this.raffleCache[groupID];
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

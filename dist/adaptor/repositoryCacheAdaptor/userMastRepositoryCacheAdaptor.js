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
exports.UserMastRepositoryCacheAdaptor = void 0;
const __1 = require("../..");
const entities_1 = require("../../entities");
class UserMastRepositoryCacheAdaptor {
    constructor(repository) {
        this.repository = repository;
        this.userEachCache = {};
        this.userAllCache = null;
        // ===============================================================
        //
        // private
        //
        // ===============================================================
        this.myUserID = null;
    }
    addUserMast(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.addUserMast(input);
            this.updateCacheEach(res.userID, res);
            this.myUserID = res.userID;
            return res;
        });
    }
    // async deleteUserMast(input: UserMast): Promise<UserMast> {
    // 	const res = await this.repository.deleteUserMast(input);
    // 	res.deletedAt = new Date().getTime();
    // 	this.updateCacheEach(res.userID, res);
    // 	return res;
    // }
    updateUserMast(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.updateUserMast(input);
            this.updateCacheEach(res.userID, res);
            this.myUserID = res.userID;
            return res;
        });
    }
    fetchMyUserMast() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.myUserID)
                return this.fetchCacheUserMast(this.myUserID);
            const res = yield this.repository.fetchMyUserMast();
            if (!res) {
                throw new __1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_401_notSignIn);
            }
            else {
                this.myUserID = res.userID;
                this.updateCacheEach(res.userID, res);
            }
            return res;
        });
    }
    fetchUserMastByUserID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = this.fetchCacheUserMast(userID);
            if (cache && cache === "blanc") {
                return null;
            }
            else if (cache) {
                return cache;
            }
            const res = yield this.repository.fetchUserMastByUserID(userID);
            this.updateCacheEach(userID, res);
            return res;
        });
    }
    fetchAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = this.fetchCacheUserAll();
            if (cache)
                return cache;
            const res = yield this.repository.fetchAllUser();
            this.updateCacheBulk(res);
            return res;
        });
    }
    updateCacheEach(userID, user) {
        this.userEachCache[userID] = user || "blanc";
        if (this.userAllCache && user) {
            this.userAllCache[userID] = user;
        }
    }
    updateCacheBulk(users) {
        this.userAllCache = {};
        for (const user of users) {
            this.updateCacheEach(user.userID, user);
        }
    }
    fetchCacheUserMast(userID) {
        return this.userEachCache[userID];
    }
    fetchCacheUserAll() {
        if (!this.userAllCache)
            return null;
        return Object.keys(this.userAllCache)
            .map((key) => {
            return this.userAllCache[key];
        })
            .sort((a, b) => (0, __1.compareNumDesc)(a.createdAt, b.createdAt));
    }
}
exports.UserMastRepositoryCacheAdaptor = UserMastRepositoryCacheAdaptor;

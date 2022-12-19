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
exports.GroupMastRepositoryCacheAdaptor = void 0;
class GroupMastRepositoryCacheAdaptor {
    constructor(repository) {
        this.repository = repository;
        this.GroupEachCache = {};
        this.GroupAllCache = null;
        this.mygroupID = null;
    }
    addGroup(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.addGroup(input);
            res.createdAt = new Date().getDate();
            this.addCacheEach(input.groupID, res);
            this.mygroupID = input.groupID;
            return res;
        });
    }
    // async deleteGroup(input: GroupMast): Promise<GroupMast> {
    // 	const res = await this.repository.deleteGroup(input);
    // 	res.deletedAt = new Date().getDate();
    // 	this.addCacheEach(input.groupID, res);
    // 	return res;
    // }
    // async updateGroup(input: GroupMast): Promise<GroupMast> {
    // 	const res = await this.repository.updateGroup(input);
    // 	res.updatedAt = new Date().getDate();
    // 	this.addCacheEach(input.groupID, res);
    // 	this.mygroupID = input.groupID;
    // 	return res;
    // }
    fetchGroupByGroupID(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = this.fetchGroup(groupID);
            if (cache && cache === "blanc") {
                return null;
            }
            else if (cache) {
                return cache;
            }
            const res = yield this.repository.fetchGroupByGroupID(groupID);
            this.addCacheEach(groupID, res);
            return res;
        });
    }
    // ===============================================================
    //
    // private
    //
    // ===============================================================
    addCacheEach(groupID, Group) {
        this.GroupEachCache[groupID] = Group || "blanc";
        if (this.GroupAllCache && Group) {
            this.GroupAllCache[groupID] = Group;
        }
    }
    fetchGroup(groupID) {
        return this.GroupEachCache[groupID];
    }
}
exports.GroupMastRepositoryCacheAdaptor = GroupMastRepositoryCacheAdaptor;

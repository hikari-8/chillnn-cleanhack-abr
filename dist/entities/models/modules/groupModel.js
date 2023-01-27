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
exports.GroupModel = void 0;
const _baseModel_1 = require("./_baseModel");
const util_1 = require("../../../util");
class GroupModel extends _baseModel_1.BaseModel {
    static getBlanc(createdUserID) {
        return {
            createdUserID,
            groupID: (0, util_1.generateUUID)(),
            members: [createdUserID],
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };
    }
    // ============================================
    // getters
    // ============================================
    get groupID() {
        return this.mast.groupID;
    }
    get createdUserID() {
        return this.mast.createdUserID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    get updatedAt() {
        return this.mast.updatedAt;
    }
    get deletedAt() {
        return this.mast.deletedAt;
    }
    // ============================================
    // getter / setter
    // ============================================
    get groupName() {
        if (!this.mast.groupName) {
            this.mast.groupName = "";
        }
        return this.mast.groupName;
    }
    set groupName(input) {
        this.mast.groupName = input;
    }
    get members() {
        if (!this.mast.members) {
            this.mast.members = [];
        }
        return this.mast.members;
    }
    set members(input) {
        this.mast.members = input;
    }
    // ============================================
    // validation
    // ============================================
    get isRegisterable() {
        return true;
    }
    get isAdmin() {
        return true;
    }
    // ============================================
    // functions
    // ============================================
    /**
     * グループを新規登録、または更新する
     */
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRegisterable) {
                const now = new Date().getTime();
                if (this.isNew) {
                    this.mast.createdAt = now;
                    this.mast.updatedAt = now;
                    yield this.repositoryContainer.groupMastRepository.addGroup(this.mast);
                }
                else {
                    this.mast.updatedAt = now;
                    yield this.repositoryContainer.groupMastRepository.updateGroup(this.mast);
                }
                this.isNew = false;
            }
        });
    }
    /**
     * Admin以外がgroupのparamsで入ってきた時、groupのmembersの配列にpushして、updateする
     */
    pushGroupMembers(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            this.mast.members.push(userID);
            yield this.updateGroupMast();
        });
    }
    /**
     * グループを更新できる
     *
     */
    updateGroupMast() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repositoryContainer.groupMastRepository.updateGroup(this.mast);
        });
    }
    /**
     * グループをfetchできる
     *
     */
    fetchGroupMast() {
        return __awaiter(this, void 0, void 0, function* () {
            const groupMast = yield this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(this.groupID);
            if (!groupMast) {
                return null;
            }
            else {
                const res = this.modelFactory.GroupModel(groupMast);
                return res;
            }
        });
    }
    /**
     * rafflesをgroupからfetchできる
     * @returns
     *
     */
    fetchRafflesByGroupID() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repositoryContainer.raffleObjectRepository.fetchRafflesByGroupID(this.mast.groupID);
            return res.map((item) => this.modelFactory.RaffleObjectModel(item));
        });
    }
    /**
     * 全ての登録したくじの中で最後のくじをgorupIDでfetchできる
     *@returns
     */
    fetchLastRaffleItemByGroupID() {
        return __awaiter(this, void 0, void 0, function* () {
            const lastItem = yield this.repositoryContainer.raffleObjectRepository.fetchLastRaffleByGroupID(this.mast.groupID);
            if (!lastItem) {
                return null;
            }
            else {
                const res = this.modelFactory.RaffleObjectModel(lastItem);
                return res;
            }
        });
    }
    /**
     * このグループのマスターデータを取得する //多分使えん(モデファク入れとらんけ)
     * @returns
     */
    fetchTaskMasterObject() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repositoryContainer.taskMasterObjectRepository.fetchTaskMasterObject(this.groupID);
            return res;
        });
    }
    /**
     * groupのmodelをmastに解く関数
     *
     */
    GroupModelToGroupMast() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mast;
        });
    }
    /**
     * groupのmastをmodelに解く関数
     *
     */
    GroupMastToGroupModel(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input) {
                return null;
            }
            //modelFactoryに入れて、modelを作る
            const res = this.modelFactory.GroupModel(input);
            return res;
        });
    }
}
exports.GroupModel = GroupModel;

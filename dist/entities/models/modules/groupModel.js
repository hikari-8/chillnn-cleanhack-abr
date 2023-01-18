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
        return this.mast.groupName || "";
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
    set joinUserIDArray(input) {
        this.mast.members = input;
    }
    // get records() {
    // 	return this.mast.records;
    // }
    // set records(input: RaffleObject[]) {
    // 	this.mast.records = input;
    // }
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
     * ユーザー情報を新規登録、または更新する
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
     *
     */
    pushGroupMembers(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            this.mast.members.push(userID);
            yield this.updateGroupMast();
        });
    }
    /**
     * グループを更新できる(後でフロントでroleの分岐作る)
     *
     */
    updateGroupMast() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repositoryContainer.groupMastRepository.updateGroup(this.mast);
        });
    }
    /**
     * グループをfetchできる(後でフロントでroleの分岐作る)
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
     * rafflesをgroupからfetchできる(後でフロントでroleの分岐作る)
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
     * raffleDataを追加後のgroupDataにpushの処理
     *
     */
    // public pushGroupRecord(input: RaffleObject) {
    // 	const groupMast = this.mast;
    // 	groupMast.records?.push(input);
    // 	//groupMastをupdateする
    // 	console.log("push直後のupdateされていないgroup:", groupMast);
    // 	this.repositoryContainer.groupMastRepository.updateGroup(groupMast);
    // 	console.log("GroupDataにpushしました→");
    // }
    /**
     * このグループのマスターデータを取得する //多分使えん(モデファク入れとらんけ)
     * @returns
     */
    fetchTaskMasterObject() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repositoryContainer.taskMasterObjectRepository.fetchTaskMasterObject(this.groupID);
            return res;
            // mapメソッドを使おうとしたら、型が違うと怒られる'(TaskMasterObjectにModelFactoryからアクセスして入れることになる??)
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

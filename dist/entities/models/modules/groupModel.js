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
    get records() {
        if (this.mast.records) {
            return this.mast.records;
        }
        else {
            return [];
        }
    }
    set records(input) {
        this.mast.records = input;
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
     * raffleオブジェクトをgroupからfetchできる(後でフロントでroleの分岐作る)
     *
     */
    fetchRaffleObjectModel(raffleID) {
        return __awaiter(this, void 0, void 0, function* () {
            const raffleObjectModel = yield this.repositoryContainer.raffleObjectRepository.fetchRaffleObject(raffleID);
            if (!raffleObjectModel) {
                console.error("RaffleObjectModel not found at RaffleObjectModel");
                return null;
            }
            else {
                const res = this.modelFactory.RaffleObjectModel(raffleObjectModel);
                console.log("res at fetchRaffleObjectModel", res);
                return res;
            }
        });
    }
    /**
     * raffleDataを追加後のgroupDataにpushの処理
     *
     */
    pushGroupRecord(input) {
        var _a;
        const groupMast = this.mast;
        (_a = groupMast.records) === null || _a === void 0 ? void 0 : _a.push(input);
        //groupMastをupdateする
        console.log("push直後のupdateされていないgroup:", groupMast);
        this.repositoryContainer.groupMastRepository.updateGroup(groupMast);
        console.log("GroupDataにpushしました→");
    }
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
}
exports.GroupModel = GroupModel;

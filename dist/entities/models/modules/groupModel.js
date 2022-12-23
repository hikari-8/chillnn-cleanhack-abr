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
     * roleがAdminなら、掃除場所情報を新規登録、または更新できる
     *
     */
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRegisterable && this.isAdmin) {
                const now = new Date().getTime();
                if (this.isNew) {
                    this.mast.createdAt = now;
                    this.mast.updatedAt = now;
                    yield this.repositoryContainer.groupMastRepository.updateGroup(this.mast);
                }
                this.isNew = false;
            }
        });
    }
    /**
     * このグループのマスターデータを取得する
     * @returns
     */
    fetchTaskMasterObject(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repositoryContainer.taskMasterObjectRepository.fetchTaskMasterObject(this.groupID);
            return res;
            // mapメソッドを使おうとしたら、型が違うと怒られる'(TaskMasterObjectにModelFactoryからアクセスして入れることになる??)
        });
    }
}
exports.GroupModel = GroupModel;

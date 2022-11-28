"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
const _baseModel_1 = require("./_baseModel");
const util_1 = require("../../../util");
class GroupModel extends _baseModel_1.BaseModel {
    static getBlanc(groupName) {
        return {
            groupID: util_1.generateUUID(),
            groupName,
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
        return this.mast.groupName;
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
     * このグループのマスターデータを取得する
     * @returns
     */
    async fetchTaskMasterObject(input) {
        const res = await this.repositoryContainer.taskMasterObjectRepository.fetchTaskMasterObject(this.groupID);
        return res;
        // mapメソッドを使おうとしたら、型が違うと怒られる'(TaskMasterObjectにModelFactoryからアクセスして入れることになる??)
    }
}
exports.GroupModel = GroupModel;

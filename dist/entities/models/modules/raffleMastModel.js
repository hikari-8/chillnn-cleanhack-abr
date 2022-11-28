"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaffleMastModel = void 0;
const util_1 = require("../../../util");
const _baseModel_1 = require("./_baseModel");
class RaffleMastModel extends _baseModel_1.BaseModel {
    static getBlanc(raffleID, groupID, taskName) {
        return {
            raffleID,
            taskID: util_1.generateUUID(),
            taskName,
            groupID,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };
    }
    // ============================================
    // getters
    // ============================================
    get raffleID() {
        return this.mast.groupID;
    }
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
    get taskName() {
        return this.mast.taskName;
    }
    set taskName(input) {
        this.mast.taskName = input;
    }
    get headCount() {
        return this.mast.headCount || 0;
    }
    set headCount(input) {
        if (input) {
            this.mast.headCount = input;
        }
        else {
            this.mast.headCount = null;
        }
    }
}
exports.RaffleMastModel = RaffleMastModel;

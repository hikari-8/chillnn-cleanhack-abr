"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaffleJoinUserModel = void 0;
const _baseModel_1 = require("./_baseModel");
class RaffleJoinUserModel extends _baseModel_1.BaseModel {
    static getBlanc(userID, groupID) {
        return {
            userID,
            groupID,
            joinAt: new Date().getTime(),
        };
    }
    // ============================================
    // getters
    // ============================================
    get userID() {
        return this.mast.userID;
    }
    get groupID() {
        return this.mast.groupID;
    }
    get joinAt() {
        return this.mast.joinAt;
    }
    get deletedAt() {
        return this.mast.deletedAt;
    }
}
exports.RaffleJoinUserModel = RaffleJoinUserModel;

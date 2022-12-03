import { BaseModel } from "./_baseModel";
export class RaffleJoinUserModel extends BaseModel {
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

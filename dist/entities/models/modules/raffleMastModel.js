import { generateUUID } from "../../../util";
import { BaseModel } from "./_baseModel";
export class RaffleMastModel extends BaseModel {
    static getBlanc(raffleID, groupID, taskName) {
        return {
            raffleID,
            taskID: generateUUID(),
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

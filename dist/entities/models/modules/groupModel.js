import { BaseModel } from "./_baseModel";
import { generateUUID } from "../../../util";
export class GroupModel extends BaseModel {
    static getBlanc(groupName) {
        return {
            groupID: generateUUID(),
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

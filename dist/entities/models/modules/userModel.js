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
exports.UserModel = void 0;
const taskMasterObjectModel_1 = require("./taskMasterObjectModel");
const _baseModel_1 = require("./_baseModel");
const taskMastModel_1 = require("./taskMastModel");
const util_1 = require("../../../util");
class UserModel extends _baseModel_1.BaseModel {
    // ============================================
    // getters
    // ============================================
    get userID() {
        return this.mast.userID;
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
    get name() {
        return this.mast.name;
    }
    set name(input) {
        this.mast.name = input;
    }
    get email() {
        return this.mast.email;
    }
    set email(input) {
        this.mast.email = input;
    }
    get role() {
        return this.mast.role || "";
    }
    set role(input) {
        this.mast.role = input;
    }
    // ============================================
    // getter / setter -not mandatory
    // ============================================
    //配列データを取ってくるだけ(ポインタを取得するだけ)
    get records() {
        return (this.mast.records = []);
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
    // ============================================
    // functions
    // ============================================
    isAdmin() {
        if (this.mast.role === "admin") {
            return true;
        }
    }
    /**
     * ユーザー情報を新規登録、または更新する
     */
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRegisterable) {
                const now = new Date().getTime();
                if (this.isNew && !this.isAdmin) {
                    this.mast.createdAt = now;
                    this.mast.updatedAt = now;
                    yield this.repositoryContainer.userMastRepository.addUserMast(this.mast);
                }
                else if (this.isNew) {
                    this.mast.createdAt = now;
                    this.mast.updatedAt = now;
                    this.mast.role = "admin";
                    yield this.repositoryContainer.userMastRepository.addUserMast(this.mast);
                }
                else {
                    this.mast.updatedAt = now;
                    yield this.repositoryContainer.userMastRepository.updateUserMast(this.mast);
                }
                this.isNew = false;
            }
        });
    }
    /**
     * グループを更新できる(後でroleで分岐作る)
     *
     */
    updateGroupMast() {
        return __awaiter(this, void 0, void 0, function* () {
            const groupModel = yield this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(this.groupID);
            const now = new Date().getTime();
            groupModel.updatedAt = now;
            yield this.repositoryContainer.groupMastRepository.updateGroup(groupModel);
        });
    }
    /**
     * このグループのグループデータを取得する
     * @returns
     */
    fetchGroupDataByGroupID(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!groupID) {
                return null;
            }
            else {
                const groupData = yield this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(groupID);
                if (groupData == null) {
                    return null;
                }
                const res = yield this.modelFactory.GroupModel(groupData);
                return res;
            }
        });
    }
    /**
     * このグループのtaskMastObjectデータを配列で初期化する,
     * いらんかもこのメソッド
     * @returns
     */
    createTaskMast() {
        const res = this.modelFactory.TaskMastModel(taskMastModel_1.TaskMastModel.getBlanc(this.groupID, ""));
        return res;
    }
    /**
     * このグループのtaskMastObjectデータを配列で初期化する
     * @returns
     */
    createNewTaskMasterObj() {
        return __awaiter(this, void 0, void 0, function* () {
            const taskID = (0, util_1.generateUUID)();
            const groupID = this.groupID;
            const now = new Date().getTime();
            return this.modelFactory.TaskMasterObjectModel(taskMasterObjectModel_1.TaskMasterObjectModel.getBlanc(this.groupID, [
                {
                    groupID: groupID,
                    createdAt: now,
                    updatedAt: now,
                    taskID: taskID,
                    taskName: "",
                },
            ]));
        });
    }
    /**
     * マスターデータを更新できる(後でroleで分岐作る)
     *
     */
    // async updateTaskMasterObj() {
    // updateしてないので,nullが入ってそう
    // if (this.groupID == null) {
    // 	return console.error("groupIDがnullです");
    // }
    // const taskMasterObjModel =
    // 	await this.repositoryContainer.taskMasterObjectRepository.fetchTaskMasterObject(
    // 		this.groupID
    // 	);
    // const now = new Date().getTime();
    // taskMasterObjModel!.updatedAt = now;
    // await this.repositoryContainer.taskMasterObjectRepository.updateTaskMasterObject(
    // 	taskMasterObjModel!
    // );
    // }
    /**
     * このグループのtaskMasterデータを取得する
     * @returns
     */
    fetchTaskMasterDataObjByGroupID(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!groupID) {
                return null;
            }
            else {
                const taskMasterObjectData = yield this.repositoryContainer.taskMasterObjectRepository.fetchTaskMasterObject(groupID);
                const res = this.modelFactory.TaskMasterObjectModel(taskMasterObjectData);
                return res;
            }
        });
    }
}
exports.UserModel = UserModel;

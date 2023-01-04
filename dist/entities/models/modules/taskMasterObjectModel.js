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
exports.TaskMasterObjectModel = void 0;
const _baseModel_1 = require("./_baseModel");
const taskMastModel_1 = require("./taskMastModel");
class TaskMasterObjectModel extends _baseModel_1.BaseModel {
    static getBlanc(groupID, tasks) {
        return {
            tasks,
            groupID,
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
    get limitTime() {
        return this.mast.limitTime || 0;
    }
    set limitTime(input) {
        if (input) {
            this.mast.limitTime = input;
        }
        else {
            this.mast.limitTime = null;
        }
    }
    get remindSlackWeek() {
        return this.mast.remindSlackWeek || "blanc";
    }
    set remindSlackWeek(input) {
        if (input) {
            this.mast.remindSlackWeek = input;
        }
        else {
            this.mast.remindSlackWeek = null;
        }
    }
    get remindSlackTime() {
        return this.mast.remindSlackWeek || "blanc";
    }
    set remindSlackTime(input) {
        if (input) {
            this.mast.remindSlackWeek = input;
        }
        else {
            this.mast.remindSlackWeek = null;
        }
    }
    get tasks() {
        return this.mast.tasks;
    }
    set tasks(input) {
        this.mast.tasks = input;
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
    // ============================================
    // functions
    // ============================================
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
                    yield this.repositoryContainer.taskMasterObjectRepository.addTaskMasterObject(this.mast);
                }
                else {
                    this.mast.updatedAt = now;
                    yield this.repositoryContainer.taskMasterObjectRepository.updateTaskMasterObject(this.mast);
                }
                this.isNew = false;
            }
        });
    }
    // /**
    //  * グループIDから、ルームの個々のデータを取得する
    //  * @returns
    //  */
    // async fetchTasks(): Promise<TaskMastModel[]> {
    // 	const res =
    // 		await this.repositoryContainer.taskMasterObjectRepository.fetchTasksByGroupID(
    // 			this.groupID
    // 		);
    // 	return res.map((item) => this.modelFactory.TaskMastModel(item));
    // }
    // taskObjectがtaskMastを保持していることを明示する(別のクラスが別のクラスを保持している)
    getTaskMastModel(groupID) {
        const blank = taskMastModel_1.TaskMastModel.getBlanc(this.groupID, "blanc");
        return this.modelFactory.TaskMastModel(blank, { isNew: true });
    }
}
exports.TaskMasterObjectModel = TaskMasterObjectModel;

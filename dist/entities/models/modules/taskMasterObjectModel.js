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
const type_1 = require("../../type");
const _baseModel_1 = require("./_baseModel");
const __1 = require("../../..");
const taskMastModel_1 = require("./taskMastModel");
const raffleObjectModel_1 = require("./raffleObjectModel");
const raffleMastModel_1 = require("./raffleMastModel");
class TaskMasterObjectModel extends _baseModel_1.BaseModel {
    static getBlanc(groupID, tasks) {
        return {
            tasks,
            groupID,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
            taskMasterObjectID: (0, __1.generateUUID)(),
        };
    }
    // ============================================
    // getters
    // ============================================
    get groupID() {
        return this.mast.groupID;
    }
    get taskMasterObjectID() {
        return this.mast.taskMasterObjectID;
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
        return this.mast.remindSlackTime || "blanc";
    }
    set remindSlackTime(input) {
        if (input) {
            this.mast.remindSlackTime = input;
        }
        else {
            this.mast.remindSlackTime = null;
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
     * 掃除場所情報を新規登録、または更新できる/ !roleがAdminかどうか後で分岐を作るべき
     *
     */
    updateTaskMasterObj() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mast.updatedAt = new Date().getTime();
            yield this.repositoryContainer.taskMasterObjectRepository.updateTaskMasterObject(this.mast);
        });
    }
    // taskObjectがtaskMastを保持していることを明示する(別のクラスが別のクラスを保持している)
    getTaskMastModel(groupID) {
        const blank = taskMastModel_1.TaskMastModel.getBlanc(this.groupID, "blanc");
        return this.modelFactory.TaskMastModel(blank, { isNew: true });
    }
    /**
     * くじの初期化オブジェクトを作成する
     *
     */
    getRaffleModel() {
        //taskが持ってる配列を一つづつ取り出して、raffleMに入れる
        const taskArray = this.tasks;
        console.log("taskArray: ", taskArray);
        const newTaskArray = taskArray.map((task) => raffleMastModel_1.RaffleMastModel.getBlanc(task.taskName, task.groupID));
        //モデルの中身をマストに変換する(すでにMast[])
        // const taskArrayMast = newTaskArray.raffleMastModelToTaskMast();
        console.log("newTaskArray: ", newTaskArray);
        const status = type_1.RaffleStatus.EFFECTIVE;
        const blankRaffle = raffleObjectModel_1.RaffleObjectModel.getBlanc(newTaskArray, this.groupID, this.limitTime, status, this.remindSlackWeek, this.remindSlackTime);
        console.log("blancRaffle: ", blankRaffle);
        return this.modelFactory.RaffleObjectModel(blankRaffle, {
            isNew: true,
        });
    }
}
exports.TaskMasterObjectModel = TaskMasterObjectModel;

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
    get limitHour() {
        if (!this.mast.limitHour) {
            this.mast.limitHour = 0;
        }
        return this.mast.limitHour;
    }
    set limitHour(input) {
        this.mast.limitHour = input;
    }
    get limitMin() {
        if (!this.mast.limitMin) {
            this.mast.limitMin = 0;
        }
        return this.mast.limitMin;
    }
    set limitMin(input) {
        this.mast.limitMin = input;
    }
    get limitTimeUnix() {
        if (!this.mast.limitTimeUnix) {
            this.mast.limitTimeUnix = 0;
        }
        return this.mast.limitTimeUnix;
    }
    set limitTimeUnix(input) {
        this.mast.limitTimeUnix = input;
    }
    get remindSlackHour() {
        if (!this.mast.remindSlackHour) {
            this.mast.remindSlackHour = 0;
        }
        return this.mast.remindSlackHour;
    }
    set remindSlackHour(input) {
        this.mast.remindSlackHour = input;
    }
    get remindSlackMin() {
        if (!this.mast.remindSlackMin) {
            this.mast.remindSlackMin = 0;
        }
        return this.mast.remindSlackMin;
    }
    set remindSlackMin(input) {
        this.mast.remindSlackMin = input;
    }
    get remindTimeUnix() {
        if (!this.mast.remindTimeUnix) {
            this.mast.remindTimeUnix = 0;
        }
        return this.mast.remindTimeUnix;
    }
    set remindTimeUnix(input) {
        this.mast.remindTimeUnix = input;
    }
    get channelID() {
        if (!this.mast.channelID) {
            this.mast.channelID = "";
        }
        return this.mast.channelID;
    }
    set channelID(input) {
        this.mast.channelID = input;
    }
    get tasks() {
        if (!this.mast.tasks) {
            this.mast.tasks = [];
        }
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
    /**
     * 個々の掃除場所taskMast新規登録のためのインスタンス作成
     *
     */
    getTaskMastModel(groupID) {
        const blank = taskMastModel_1.TaskMastModel.getBlanc(this.groupID, "blanc", 0, "");
        return this.modelFactory.TaskMastModel(blank, { isNew: true });
    }
    /**
     * くじの初期化オブジェクトを作成する
     *
     */
    getRaffleModel() {
        return __awaiter(this, void 0, void 0, function* () {
            //taskが持ってる配列を一つづつ取り出して、raffleMに入れる
            //mastのfilterかけたものにする
            const taskArray = yield this.filterActiveTasksMast();
            // 新しいMastを作成する
            const newTaskArray = taskArray.map((task) => raffleMastModel_1.RaffleMastModel.getBlanc(task.taskID, task.taskName, task.groupID, task.headCount, [], task.optionItem, []));
            const status = type_1.RaffleStatus.EFFECTIVE;
            //くじたちのMastを作成する
            const blankRaffle = raffleObjectModel_1.RaffleObjectModel.getBlanc(newTaskArray, this.groupID, this.limitHour, this.limitMin, this.limitTimeUnix, status, this.remindSlackHour, this.remindSlackMin, this.remindTimeUnix, this.channelID, []);
            return this.modelFactory.RaffleObjectModel(blankRaffle, {
                isNew: true,
            });
        });
    }
    /**
     * このグループのくじデータをくじのuuidで取得する
     * @returns
     */
    fetchRaffleItemByRaffleID(raffleID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!raffleID) {
                return null;
            }
            else {
                const raffleItem = yield this.repositoryContainer.raffleObjectRepository.fetchRaffleObject(raffleID);
                if (!raffleItem) {
                    return null;
                }
                //modelFactoryに入れて、modelを作る
                const res = this.modelFactory.RaffleObjectModel(raffleItem);
                return res;
            }
        });
    }
    /**
     * このグループのtasksから、statusがdeletedを省いて返す
     *
     */
    filterActiveTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = this.mast.tasks;
            const res = tasks.filter(function (task) {
                return task.taskStatus === type_1.TaskStatus.ACTIVE;
            });
            return res.map((item) => this.modelFactory.TaskMastModel(item));
        });
    }
    /**
     * このグループのtasksから、statusがdeletedを省いて返す(mastで返す版)
     *
     */
    filterActiveTasksMast() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = this.mast.tasks;
            const res = tasks.filter(function (task) {
                return task.taskStatus === type_1.TaskStatus.ACTIVE;
            });
            return res;
        });
    }
}
exports.TaskMasterObjectModel = TaskMasterObjectModel;

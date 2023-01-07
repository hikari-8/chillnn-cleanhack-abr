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
exports.RaffleObjectModel = void 0;
const _baseModel_1 = require("./_baseModel");
const __1 = require("../../..");
class RaffleObjectModel extends _baseModel_1.BaseModel {
    static getBlanc(tasks, groupID, limitTime, raffleStatus, remindSlackWeek, remindSlackTime) {
        return {
            raffleID: (0, __1.generateUUID)(),
            tasks,
            groupID,
            limitTime,
            raffleStatus,
            remindSlackWeek,
            remindSlackTime,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };
    }
    // ============================================
    // getters
    // ============================================
    get raffleID() {
        return this.mast.raffleID;
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
    get limitTime() {
        return this.mast.limitTime || 0;
    }
    set limitTime(input) {
        if (input) {
            this.mast.limitTime = input;
        }
        else {
            this.mast.limitTime = 0;
        }
    }
    get raffleStatus() {
        return this.mast.raffleStatus;
    }
    // 引数見直した方がいいかも
    set raffleStatus(input) {
        if (this.isNew) {
            this.mast.raffleStatus === "EFFECTIVE";
        }
        else if (this.isDone) {
            this.mast.raffleStatus === "DONE";
        }
        else {
            this.mast.raffleStatus === "EFFECTIVE_AND_FIXED";
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
            this.mast.remindSlackWeek = "blanc";
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
            this.mast.remindSlackWeek = "blanc";
        }
    }
    get tasks() {
        return (this.mast.tasks = []);
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
    get isDone() {
        return true;
    }
    /**
     * ルームのそれぞれのくじのデータを一括で登録・編集する //後でroleで分岐作る
     */
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRegisterable) {
                const now = new Date().getTime();
                if (this.isNew) {
                    this.mast.createdAt = now;
                    this.mast.updatedAt = now;
                    yield this.repositoryContainer.raffleObjectRepository.addRaffleObject(this.mast);
                }
                // else {
                // 	this.mast.updatedAt = now;
                // 	await this.repositoryContainer.raffleObjectRepository.updateRaffleObject(
                // 		this.mast
                // 	);
                // }
                this.isNew = false;
            }
        });
    }
    // /**
    //  * グループIDから、ルームの個々のデータを取得する
    //  * @returns
    //  */
    fetchRaffle(groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repositoryContainer.raffleObjectRepository.fetchRaffleObject(this.groupID);
            // return res.map((item) => this.modelFactory.RaffleMastModel(item));
        });
    }
}
exports.RaffleObjectModel = RaffleObjectModel;

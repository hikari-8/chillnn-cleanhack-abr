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
    static getBlanc(tasks, groupID, limitHour, limitMin, limitTimeUnix, raffleStatus, remindSlackHour, remindSlackMin, remindTimeUnix, channelID, activeMembers) {
        return {
            raffleID: (0, __1.generateUUID)(),
            tasks,
            groupID,
            limitHour,
            limitMin,
            limitTimeUnix,
            raffleStatus,
            remindSlackHour,
            remindSlackMin,
            remindTimeUnix,
            channelID,
            activeMembers,
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
    get raffleStatus() {
        return this.mast.raffleStatus;
    }
    // 引数見直した方がいいかも
    set raffleStatus(input) {
        if (input) {
            this.mast.raffleStatus = input;
        }
        else {
            return;
        }
    }
    get tasks() {
        return this.mast.tasks;
    }
    set tasks(input) {
        this.mast.tasks = input;
    }
    get activeMembers() {
        if (!this.mast.activeMembers) {
            this.mast.activeMembers = [];
        }
        return this.mast.activeMembers;
    }
    set activeMembers(input) {
        this.mast.activeMembers = input;
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
    get resultMessage() {
        if (!this.mast.resultMessage) {
            this.mast.resultMessage = "";
        }
        return this.mast.resultMessage;
    }
    set resultMessage(input) {
        this.mast.resultMessage = input;
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
                else {
                    this.mast.updatedAt = now;
                    yield this.repositoryContainer.raffleObjectRepository.updateRaffleObject(this.mast);
                }
                this.isNew = false;
            }
        });
    }
    /**
     * 全ての登録したくじをgorupIDでfetchできる
     *@returns
     */
    fetchRafflesByGroupID() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repositoryContainer.raffleObjectRepository.fetchRafflesByGroupID(this.mast.groupID);
            return res.map((item) => this.modelFactory.RaffleObjectModel(item));
        });
    }
    /**
     * 全ての登録したくじの中で最後のくじをgorupIDでfetchできる
     *@returns
     */
    fetchLastRaffleItemByGroupID() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.mast.groupID) {
                return null;
            }
            else {
                const lastItem = yield this.repositoryContainer.raffleObjectRepository.fetchLastRaffleByGroupID(this.mast.groupID);
                if (lastItem == null) {
                    return null;
                }
                else {
                    const res = this.modelFactory.RaffleObjectModel(lastItem);
                    return res;
                }
            }
        });
    }
    /**
     * グループDataをfetchできる
     *
     */
    fetchGroupMast() {
        return __awaiter(this, void 0, void 0, function* () {
            const groupMast = yield this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(this.groupID);
            if (!groupMast) {
                console.error("GroupMast not found at fetchGroupMast");
                return null;
            }
            else {
                const res = this.modelFactory.GroupModel(groupMast);
                return res;
            }
        });
    }
    /**
     * raffleのmodelをmastに解く関数
     *
     */
    raffleObjectModelToRaffleObject() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mast;
        });
    }
    /**
     * raffleからuserModelをとってくるための関数(serverで使用)
     *
     */
    fetchUserModelToGetBlanc() {
        return __awaiter(this, void 0, void 0, function* () {
            //1番目のjoinuserのuserIDを借りる
            const groupMast = yield this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(this.mast.groupID);
            const userID = groupMast === null || groupMast === void 0 ? void 0 : groupMast.createdUserID;
            const userData = yield this.repositoryContainer.userMastRepository.fetchUserMastByUserID(userID);
            if (userData == null) {
                return null;
            }
            const res = this.modelFactory.UserModel(userData);
            return res;
        });
    }
    // /**
    //  * raffleIDから、ルームの個々のデータを取得する
    //  * @returns
    //  */
    fetchRaffleItem() {
        return __awaiter(this, void 0, void 0, function* () {
            const raffleItem = yield this.repositoryContainer.raffleObjectRepository.fetchRaffleObject(this.raffleID);
            if (!raffleItem) {
                return null;
            }
            else {
                const res = this.modelFactory.RaffleObjectModel(raffleItem);
                return res;
            }
        });
    }
}
exports.RaffleObjectModel = RaffleObjectModel;

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
const type_1 = require("../../type");
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
        return this.mast.limitTime || "";
    }
    set limitTime(input) {
        if (input) {
            this.mast.limitTime = input;
        }
        else {
            this.mast.limitTime = "";
        }
    }
    get raffleStatus() {
        return this.mast.raffleStatus;
    }
    // 引数見直した方がいいかも
    set raffleStatus(input) {
        if (input) {
            this.mast.raffleStatus === input;
        }
        else {
            this.mast.raffleStatus === type_1.RaffleStatus.EFFECTIVE;
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
        return this.mast.remindSlackTime || "blanc";
    }
    set remindSlackTime(input) {
        if (input) {
            this.mast.remindSlackTime = input;
        }
        else {
            this.mast.remindSlackTime = "blanc";
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
     * 全ての登録したくじをgorupIDでfetchできる(後でフロントでroleの分岐作る)
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
            const lastItem = yield this.repositoryContainer.raffleObjectRepository.fetchLastRaffleByGroupID(this.mast.groupID);
            if (!lastItem) {
                return null;
            }
            else {
                const res = this.modelFactory.RaffleObjectModel(lastItem);
                return res;
            }
        });
    }
    /**
     * ルームのそれぞれのくじのデータを一括で登録・編集する //後でroleで分岐作る
     *
     */
    // async addNewRaffle() {
    // 	if (!groupData) return console.error("No group found");
    // 	let lastItemStatus = groupData.records?.slice(-1)[0].raffleStatus;
    // 	console.log(
    // 		"groupData.records?.slice(-1)[0]:",
    // 		groupData.records?.slice(-1)[0],
    // 		"groupData.records",
    // 		groupData.records
    // 	);
    // 	if (
    // 		groupData.records !== null &&
    // 		lastItemStatus !== RaffleStatus.DONE
    // 	) {
    // 		console.log(
    // 			"records:",
    // 			groupData.records,
    // 			"lastItemStatus:",
    // 			lastItemStatus
    // 		);
    // 		return alert(
    // 			"すでにくじが実行中です。実行中のくじを削除したい場合は、グループ欄からくじを削除してください"
    // 		);
    // 	} else {
    // 		//くじを新規作成
    // 		return this.register();
    // 	}
    // fetchする
    // const newRaffle =
    // 	await this.repositoryContainer.raffleObjectRepository.fetchRaffleObject(
    // 		this.raffleID
    // 	);
    // console.log("登録後fetchしたraffle:", newRaffle);
    // register&fetchしたraffleをgroupのrecords末尾にも追加
    // if (!newRaffle) {
    // 	return console.error("raffle is not fetched after register");
    // }
    // groupData.records!.push(newRaffle);
    // //groupMastをupdateする
    // await this.repositoryContainer.groupMastRepository.updateGroup(
    // 	groupData
    // );
    // }
    /**
     * raffleDataを追加後のgroupDataにpushの処理
     *
     */
    // async pushGroupRecord() {
    // 	// fetchする
    // 	const newRaffle =
    // 		await this.repositoryContainer.raffleObjectRepository.fetchRaffleObject(
    // 			this.raffleID
    // 		);
    // 	console.log("登録後fetchしたraffle:", newRaffle);
    // 	//register&fetchしたraffleをgroupのrecords末尾にも追加
    // 	const groupData =
    // 		await this.repositoryContainer.groupMastRepository.fetchGroupByGroupID(
    // 			this.groupID
    // 		);
    // 	if (!groupData) return console.error("No group found");
    // 	if (!newRaffle) {
    // 		return console.error("raffle is not fetched after register");
    // 	}
    // 	groupData.records!.push(newRaffle);
    // 	//groupMastをupdateする
    // 	await this.repositoryContainer.groupMastRepository.updateGroup(
    // 		groupData
    // 	);
    // 	console.log("GroupDataにpushしました→", groupData);
    // }
    /**
     * グループDataをfetchできる(後でフロントでroleの分岐作る)
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
                console.log("res at getchGroupMast", res);
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

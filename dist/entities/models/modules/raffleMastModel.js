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
exports.RaffleMastModel = void 0;
const util_1 = require("../../../util");
const _baseModel_1 = require("./_baseModel");
class RaffleMastModel extends _baseModel_1.BaseModel {
    static getBlanc(taskID, taskName, groupID, headCount, joinUserIDArray, optionItem
    // raffleID: Scalars["ID"]
    ) {
        return {
            taskID,
            taskName,
            groupID,
            headCount,
            // userID,
            joinUserIDArray,
            optionItem,
            raffleItemID: (0, util_1.generateUUID)(),
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
            this.mast.headCount = 0;
        }
    }
    get joinUserIDArray() {
        if (!this.mast.joinUserIDArray) {
            this.mast.joinUserIDArray = [];
        }
        return this.mast.joinUserIDArray;
    }
    set joinUserIDArray(input) {
        this.mast.joinUserIDArray = input;
    }
    get optionItem() {
        if (!this.mast.optionItem) {
            this.mast.optionItem = [];
        }
        return this.mast.optionItem;
    }
    set optionItem(input) {
        this.mast.optionItem = input;
    }
    // ============================================
    // validation
    // ============================================
    // ============================================
    // functions
    // ============================================
    /**
     * RaffleMastModelをmastに解く関数
     *
     */
    raffleMastModelToTaskMast() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mast;
        });
    }
}
exports.RaffleMastModel = RaffleMastModel;

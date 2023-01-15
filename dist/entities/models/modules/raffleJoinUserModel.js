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
exports.RaffleJoinUserModel = void 0;
const _baseModel_1 = require("./_baseModel");
class RaffleJoinUserModel extends _baseModel_1.BaseModel {
    static getBlanc(userID, groupID) {
        return {
            userID,
            groupID,
            joinAt: new Date().getTime(),
        };
    }
    // ============================================
    // getters
    // ============================================
    get userID() {
        return this.mast.userID;
    }
    get groupID() {
        return this.mast.groupID;
    }
    get joinAt() {
        return this.mast.joinAt;
    }
    get deletedAt() {
        return this.mast.deletedAt;
    }
    // ============================================
    // getter / setter
    // ============================================
    // ============================================
    // validation
    // ============================================
    // ============================================
    // functions
    // ============================================
    /**
     * mastに解く関数
     */
    raffleJoinUserModelToMast() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mast;
        });
    }
}
exports.RaffleJoinUserModel = RaffleJoinUserModel;

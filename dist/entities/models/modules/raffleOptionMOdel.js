"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaffleOptionModel = void 0;
const _baseModel_1 = require("./_baseModel");
class RaffleOptionModel extends _baseModel_1.BaseModel {
    static getBlanc(optionName, availableUsers) {
        return {
            optionName,
            availableUsers,
        };
    }
    // ============================================
    // getters
    // ============================================
    get optionName() {
        if (!this.mast.optionName) {
            this.mast.optionName = "";
        }
        return this.mast.optionName;
    }
    set optionName(input) {
        this.mast.optionName = input;
    }
    get availableUsers() {
        if (!this.mast.availableUsers) {
            this.mast.availableUsers = [];
        }
        return this.mast.availableUsers;
    }
    set availableUsers(input) {
        this.mast.availableUsers = input;
    }
}
exports.RaffleOptionModel = RaffleOptionModel;

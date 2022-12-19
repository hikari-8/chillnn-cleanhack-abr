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
const _baseModel_1 = require("./_baseModel");
const groupModel_1 = require("./groupModel");
class UserModel extends _baseModel_1.BaseModel {
    // ============================================
    // getters
    // ============================================
    get userID() {
        return this.mast.userID;
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
     * Adminならグループを登録、更新できる
     */
    groupRegister() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRegisterable) {
                const now = new Date().getTime();
                if (this.isNew && this.role !== "admin") {
                    return window.alert("管理者権限がありません。管理者に言って、Admin権限を付与してもらってください。");
                }
                else if (this.isNew && this.role === "admin") {
                    this.mast.createdAt = now;
                    this.mast.updatedAt = now;
                    yield this.createGroupModel();
                }
                else {
                    this.mast.updatedAt = now;
                    yield this.createGroupModel();
                }
                this.isNew = false;
            }
        });
    }
    createGroupModel() {
        return this.modelFactory.GroupModel(groupModel_1.GroupModel.getBlanc(this.userID), {
            isNew: true,
        });
    }
}
exports.UserModel = UserModel;

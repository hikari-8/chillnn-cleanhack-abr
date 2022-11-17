"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanPlaceModel = void 0;
const _baseModel_1 = require("./_baseModel");
const userModel_1 = require("./userModel");
const __1 = require("../../..");
class CleanPlaceModel extends _baseModel_1.BaseModel {
    static getBlanc() {
        return {
            cleanPlaceID: __1.generateUUID(),
            placeName: Scalars["String"],
            createdAt: new Date().getTime(),
        };
    }
    // ============================================
    // getters
    // ============================================
    get cleanPlaceID() {
        return this.mast.cleanPlaceID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    get updatedAt() {
        return this.mast.updatedAt;
    }
    // ============================================
    // getter / setter
    // ============================================
    get placeName() {
        return this.mast.placeName;
    }
    set placeName(input) {
        this.mast.placeName = input;
    }
    get headCount() {
        return this.mast.headCount || 0;
    }
    set headCount(input) {
        if (input) {
            this.mast.headCount = input;
        }
        else {
            this.mast.headCount = null;
        }
    }
    // ============================================
    // validation
    // ============================================
    get isRegisterble() {
        return true;
    }
    // ============================================
    // functions
    // ============================================
    /**
     * アイコン画像をセットする
    //  * @param file
     */
    // async setIcon(file: File) {
    // 	const path = `user/${this.userID}/iconImage/${new Date().getTime()}`;
    // 	this.mast.userIcon =
    // 		await this.repositoryContainer.s3Repository.addFile(path, file);
    // }
    /**
     * 掃除場所情報を新規登録、または更新する
     * roleがある=Adminに設定
     */
    async register() {
        if (userModel_1.UserModel.role === "admin") {
            const now = new Date().getTime();
            if (this.isNew) {
                this.mast.createdAt = now;
                this.mast.updatedAt = now;
                await this.repositoryContainer.cleanPlaceMastRepository.addCleanPlaceMast(this.mast);
            }
            else {
                this.mast.updatedAt = now;
                await this.repositoryContainer.cleanPlaceMastRepository.updateCleanPlaceMast(this.mast);
            }
            this.isNew = false;
        }
    }
}
exports.CleanPlaceModel = CleanPlaceModel;

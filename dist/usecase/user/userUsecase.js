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
exports.UserUsecase = void 0;
const __1 = require("../..");
class UserUsecase {
    constructor(repositoryContainer, //
    modelFactory) {
        this.repositoryContainer = repositoryContainer;
        this.modelFactory = modelFactory;
    }
    fetchMyUserModel() {
        return __awaiter(this, void 0, void 0, function* () {
            const me = yield this.repositoryContainer.userMastRepository.fetchMyUserMast();
            if (!me) {
                // 存在しない場合
                throw new __1.ChillnnTrainingError(__1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
            return this.modelFactory.UserModel(me);
        });
    }
    fetchUserModelByUserID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repositoryContainer.userMastRepository.fetchUserMastByUserID(userID);
            if (!user) {
                throw new __1.ChillnnTrainingError(__1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
            return this.modelFactory.UserModel(user);
        });
    }
    fetchAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.repositoryContainer.userMastRepository.fetchAllUser();
            return users
                .map((user) => this.modelFactory.UserModel(user))
                .sort((a, b) => (0, __1.compareNumDesc)(a.createdAt, b.createdAt));
        });
    }
}
exports.UserUsecase = UserUsecase;

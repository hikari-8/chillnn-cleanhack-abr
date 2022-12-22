"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelFactory = void 0;
const userModel_1 = require("./modules/userModel");
const taskMasterObjectModel_1 = require("./modules/taskMasterObjectModel");
const taskMastModel_1 = require("./modules/taskMastModel");
const raffleObjectModel_1 = require("./modules/raffleObjectModel");
const raffleMastModel_1 = require("./modules/raffleMastModel");
const raffleJoinUserModel_1 = require("./modules/raffleJoinUserModel");
const groupModel_1 = require("./modules/groupModel");
const _baseModel_1 = require("./modules/_baseModel");
__exportStar(require("./modules/userModel"), exports);
__exportStar(require("./modules/taskMasterObjectModel"), exports);
__exportStar(require("./modules/taskMastModel"), exports);
__exportStar(require("./modules/raffleObjectModel"), exports);
__exportStar(require("./modules/raffleMastModel"), exports);
__exportStar(require("./modules/raffleJoinUserModel"), exports);
__exportStar(require("./modules/groupModel"), exports);
class ModelFactory {
    constructor(repositoryContainer //
    ) {
        this.repositoryContainer = repositoryContainer;
    }
    UserModel(mast, option) {
        return new userModel_1.UserModel(mast, //
        this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    GroupModel(mast, option) {
        return new groupModel_1.GroupModel(mast, //
        this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    TaskMasterObjectModel(mast, option) {
        return new taskMasterObjectModel_1.TaskMasterObjectModel(mast, //
        this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    TaskMastModel(mast, option) {
        return new taskMastModel_1.TaskMastModel(mast, //
        this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    RaffleObjectModel(mast, option) {
        return new raffleObjectModel_1.RaffleObjectModel(mast, //
        this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    RaffleMastModel(mast, option) {
        return new raffleMastModel_1.RaffleMastModel(mast, //
        this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    RaffleJoinUserModel(mast, option) {
        return new raffleJoinUserModel_1.RaffleJoinUserModel(mast, //
        this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
}
exports.ModelFactory = ModelFactory;

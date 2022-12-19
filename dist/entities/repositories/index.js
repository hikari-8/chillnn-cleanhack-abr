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
exports.RepositoryContainer = void 0;
__exportStar(require("./modules/S3Repository"), exports);
__exportStar(require("./modules/userMastRepository"), exports);
__exportStar(require("./modules/taskMasterObjectRepository"), exports);
__exportStar(require("./modules/raffleobjectRepository"), exports);
__exportStar(require("./modules/groupMastRepository"), exports);
class RepositoryContainer {
    constructor(
    // object
    s3Repository, //
    // entity
    userMastRepository, taskMasterObjectRepository, raffleObjectRepository, groupMastRepository) {
        this.s3Repository = s3Repository;
        this.userMastRepository = userMastRepository;
        this.taskMasterObjectRepository = taskMasterObjectRepository;
        this.raffleObjectRepository = raffleObjectRepository;
        this.groupMastRepository = groupMastRepository;
    }
}
exports.RepositoryContainer = RepositoryContainer;

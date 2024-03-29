"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = exports.RaffleStatus = exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["chillnnTraining_401_notSignIn"] = "chillnnTraining_401_notSignIn";
    ErrorCode["chillnnTraining_404_resourceNotFound"] = "chillnnTraining_404_resourceNotFound";
    ErrorCode["chillnnTraining_500_systemError"] = "chillnnTraining_500_systemError";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var RaffleStatus;
(function (RaffleStatus) {
    RaffleStatus["DONE"] = "DONE";
    RaffleStatus["EFFECTIVE"] = "EFFECTIVE";
    RaffleStatus["EFFECTIVE_AND_FIXED"] = "EFFECTIVE_AND_FIXED";
})(RaffleStatus = exports.RaffleStatus || (exports.RaffleStatus = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["ACTIVE"] = "ACTIVE";
    TaskStatus["DELETED"] = "DELETED";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));

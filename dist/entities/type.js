"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaffleStatus = exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["chillnnTraining_401_notSignIn"] = "chillnnTraining_401_notSignIn";
    ErrorCode["chillnnTraining_404_resourceNotFound"] = "chillnnTraining_404_resourceNotFound";
    ErrorCode["chillnnTraining_500_systemError"] = "chillnnTraining_500_systemError";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var RaffleStatus;
(function (RaffleStatus) {
    RaffleStatus["EFFECTIVE"] = "EFFECTIVE";
    RaffleStatus["EFFECTIVE_AND_FIXED"] = "EFFECTIVE_AND_FIXED";
    RaffleStatus["DONE"] = "DONE";
})(RaffleStatus = exports.RaffleStatus || (exports.RaffleStatus = {}));

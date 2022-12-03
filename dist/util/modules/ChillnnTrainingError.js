import { ErrorCode } from '../../entities/type';
export class ChillnnTrainingError extends Error {
    constructor(errCode, err) {
        super(errCode);
        this.chillnnErrorCode = errCode;
        this.err = err;
    }
    getMessage() {
        return errorMessages[this.chillnnErrorCode] || errorMessages[ErrorCode.chillnnTraining_500_systemError];
    }
}
const errorMessages = {
    chillnnTraining_401_notSignIn: 'サインインしていません',
    chillnnTraining_404_resourceNotFound: 'リソースが見つかりません',
    chillnnTraining_500_systemError: 'システムエラーです',
};

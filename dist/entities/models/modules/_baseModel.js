"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
class BaseModel {
    mast;
    repositoryContainer;
    modelFactory;
    option;
    static baseModelOption() {
        return {
            isNew: false,
        };
    }
    constructor(mast, repositoryContainer, //
    modelFactory, option) {
        this.mast = mast;
        this.repositoryContainer = repositoryContainer;
        this.modelFactory = modelFactory;
        this.option = option;
    }
    get isNew() {
        return this.option.isNew;
    }
    set isNew(input) {
        this.option.isNew = input;
    }
}
exports.BaseModel = BaseModel;

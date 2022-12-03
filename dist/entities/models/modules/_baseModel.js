export class BaseModel {
    constructor(mast, repositoryContainer, //
    modelFactory, option) {
        this.mast = mast;
        this.repositoryContainer = repositoryContainer;
        this.modelFactory = modelFactory;
        this.option = option;
    }
    static baseModelOption() {
        return {
            isNew: false,
        };
    }
    get isNew() {
        return this.option.isNew;
    }
    set isNew(input) {
        this.option.isNew = input;
    }
}

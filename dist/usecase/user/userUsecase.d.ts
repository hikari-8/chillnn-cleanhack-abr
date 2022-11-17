import { ModelFactory, RepositoryContainer, Scalars, UserModel } from '../..';
export declare class UserUsecase {
    private repositoryContainer;
    private modelFactory;
    constructor(repositoryContainer: RepositoryContainer, //
    modelFactory: ModelFactory);
    fetchMyUserModel(): Promise<UserModel>;
    fetchUserModelByUserID(userID: Scalars['ID']): Promise<UserModel>;
    fetchAllUser(): Promise<UserModel[]>;
}

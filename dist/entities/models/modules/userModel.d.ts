import { UserMast } from "../../type";
import { TaskMasterObjectModel } from "./taskMasterObjectModel";
import { BaseModel } from "./_baseModel";
import { GroupModel } from "./groupModel";
import { TaskMastModel } from "./taskMastModel";
import { RaffleJoinUserModel } from "./raffleJoinUserModel";
export declare class UserModel extends BaseModel<UserMast> {
    get userID(): string;
    get groupID(): string;
    set groupID(input: string);
    get createdAt(): number;
    get updatedAt(): number;
    get deletedAt(): import("../..").Maybe<number> | undefined;
    get name(): string;
    set name(input: string);
    get email(): string;
    set email(input: string);
    get role(): string;
    set role(input: string);
    get records(): string[];
    set records(input: string[]);
    get isRegisterable(): boolean;
    isAdmin(): true | undefined;
    /**
     * ユーザー情報を新規登録、または更新する
     */
    register(): Promise<void>;
    /**
     * 別のuserのデータを取得する
     * @returns
     */
    fetchUserDataByUserID(userID: string): Promise<UserModel | null>;
    /**
     * グループの初期化データを作成する
     * @returns
     */
    createNewGroup(): GroupModel;
    /**
     * このグループのグループデータを取得する
     * @returns
     */
    fetchGroupDataByGroupID(): Promise<GroupModel | null>;
    /**
     * このグループのtaskMastObjectデータを配列で初期化する
     * @returns
     */
    createTaskMast(): TaskMastModel;
    /**
     * このグループのtaskMastObjectデータを配列で初期化する
     * @returns
     */
    createNewTaskMasterObj(): Promise<TaskMasterObjectModel>;
    /**
     * このグループのtaskMasterデータを取得する
     * @returns
     */
    fetchTaskMasterDataObjByGroupID(groupID: string): Promise<TaskMasterObjectModel | null>;
    /**
     * このグループのrafflejoinuserデータのインスタンス作成
     * @returns
     */
    createRaffleJoinUser(): RaffleJoinUserModel;
}

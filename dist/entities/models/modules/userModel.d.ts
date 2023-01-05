import { UserMast } from "../../type";
import { TaskMasterObjectModel } from "./taskMasterObjectModel";
import { BaseModel } from "./_baseModel";
import { GroupModel } from "./groupModel";
import { TaskMastModel } from "./taskMastModel";
export declare class UserModel extends BaseModel<UserMast> {
    get userID(): string;
    get groupID(): import("../..").Maybe<string> | undefined;
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
     * グループを更新できる(後でroleで分岐作る)
     *
     */
    updateGroupMast(): Promise<void>;
    /**
     * このグループのグループデータを取得する
     * @returns
     */
    fetchGroupDataByGroupID(groupID: string): Promise<GroupModel | null>;
    /**
     * このグループのtaskMastObjectデータを配列で初期化する,
     * いらんかもこのメソッド
     * @returns
     */
    createTaskMast(): TaskMastModel;
    /**
     * このグループのtaskMastObjectデータを配列で初期化する
     * @returns
     */
    createNewTaskMasterObj(): Promise<TaskMasterObjectModel>;
    /**
     * マスターデータを更新できる(後でroleで分岐作る)
     *
     */
    /**
     * このグループのtaskMasterデータを取得する
     * @returns
     */
    fetchTaskMasterDataObjByGroupID(groupID: string): Promise<TaskMasterObjectModel | null>;
}

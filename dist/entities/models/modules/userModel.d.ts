import { UserMast, GroupMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { GroupModel } from "./groupModel";
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
     * グループを登録、更新できる(後でroleで分岐作る)
     *
     */
    updateGroupMast(): Promise<GroupMast | null>;
    /**
     * このグループのグループデータを取得する
     * @returns
     */
    fetchGroupDataByGroupID(input: string): Promise<GroupModel | null>;
}

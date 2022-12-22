import { UserMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { GroupModel } from "./groupModel";
export declare class UserModel extends BaseModel<UserMast> {
    get userID(): string;
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
     * Adminならグループを登録、更新できる
     */
    createGroupModel(userID: string): GroupModel;
}

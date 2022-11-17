import { UserMast } from "../../type";
import { CleanPlaceModel } from "./cleanPlaceModel";
import { BaseModel } from "./_baseModel";
export declare class UserModel extends BaseModel<UserMast> {
    get userID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get name(): string;
    set name(input: string);
    get role(): string;
    set role(input: string);
    get isRegisterble(): boolean;
    /**
     * アイコン画像をセットする
    //  * @param file
     */
    /**
     * ユーザー情報を新規登録、または更新する
     */
    register(): Promise<void>;
    /**
     * 掃除場所をAdminが新規登録・変更できる
     */
    setUpCleanPlace(): CleanPlaceModel;
}

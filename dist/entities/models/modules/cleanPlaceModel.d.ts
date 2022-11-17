import { CleanPlaceMast } from "../../type";
import { BaseModel } from "./_baseModel";
export declare class CleanPlaceModel extends BaseModel<CleanPlaceMast> {
    static getBlanc(): CleanPlaceMast;
    get cleanPlaceID(): string;
    get createdAt(): number;
    get updatedAt(): import("../..").Maybe<number> | undefined;
    get placeName(): string;
    set placeName(input: string);
    get headCount(): number;
    set headCount(input: number);
    get isRegisterble(): boolean;
    /**
     * アイコン画像をセットする
    //  * @param file
     */
    /**
     * 掃除場所情報を新規登録、または更新する
     * roleがある=Adminに設定
     */
    register(): Promise<void>;
}

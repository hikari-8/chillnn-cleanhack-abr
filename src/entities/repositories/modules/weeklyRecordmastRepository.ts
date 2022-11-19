import { Scalars, WeeklyRecordMast } from "../../type";

export interface IWeeklyRecordMastRepository {
	addWeeklyRecord(input: WeeklyRecordMast): Promise<WeeklyRecordMast>;
	updateWeeklyRecord(input: WeeklyRecordMast): Promise<WeeklyRecordMast>;
	//隔週の掃除くじデータのキャッシュを取ってくる
	fetchWeeklyRecordsByWeeklyRecordID(
		weeklyRecordID: Scalars["ID"]
	): Promise<WeeklyRecordMast | null>;
	// ルームに紐づく掃除くじデータのキャッシュを取ってくる
	fetchWeeklyRecordsByRoomID(
		roomID: Scalars["ID"]
	): Promise<WeeklyRecordMast[]>;
}

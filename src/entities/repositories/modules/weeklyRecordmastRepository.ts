import { Scalars, WeeklyRecordMast } from "../../type";

export interface IWeeklyRecordMastRepository {
	addWeeklyRecordMast(input: WeeklyRecordMast): Promise<WeeklyRecordMast>;
	deletePost(cleanPlaceID: Scalars["ID"]): Promise<WeeklyRecordMast>;
	updateWeeklyRecordMast(input: WeeklyRecordMast): Promise<WeeklyRecordMast>;
	fetchCleanPlaceMastByCleanPlaceID(
		cleanPlaceID: Scalars["ID"]
	): Promise<WeeklyRecordMast | null>;
	fetchWeeklyRecordMastBygroupID(
		groupID: Scalars["ID"]
	): Promise<WeeklyRecordMast | null>;
}

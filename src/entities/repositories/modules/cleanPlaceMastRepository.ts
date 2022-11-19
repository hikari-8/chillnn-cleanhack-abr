import { Scalars, CleanPlaceMast } from "../../type";

export interface ICleanPlaceMastRepository {
	addCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast>;
	deleteCleanPlaceMast(cleanPlaceID: Scalars["ID"]): Promise<CleanPlaceMast>;
	updateCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast>;
	// 個々の掃除場所のIDからそれぞれの掃除場所のキャッシュを取ってくる
	fetchCleanPlaceMastByCleanPlaceID(
		cleanPlaceID: Scalars["ID"]
	): Promise<CleanPlaceMast | null>;
	//ルームの掃除場所のIDからそれに紐づく掃除場所(複数)を取ってくる
	fetchCleanPlacesMastByRoomID(
		roomID: Scalars["ID"]
	): Promise<CleanPlaceMast>;
	fetchAllCleanPlaces(): Promise<CleanPlaceMast[]>;
}

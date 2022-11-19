import { Scalars, CleanPlaceMast } from "../../type";

export interface ICleanPlaceMastRepository {
	addCleanPlace(input: CleanPlaceMast): Promise<CleanPlaceMast>;
	deleteCleanPlace(cleanPlaceID: Scalars["ID"]): Promise<CleanPlaceMast>;
	updateCleanPlace(input: CleanPlaceMast): Promise<CleanPlaceMast>;
	// 個々の掃除場所のIDからそれぞれの掃除場所のキャッシュを取ってくる
	fetchCleanPlaceByCleanPlaceID(
		cleanPlaceID: Scalars["ID"]
	): Promise<CleanPlaceMast | null>;
	//ルームの掃除場所のIDからそれに紐づく掃除場所(複数)を取ってくる
	fetchCleanPlacesByRoomID(roomID: Scalars["ID"]): Promise<CleanPlaceMast[]>;
}

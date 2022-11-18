import { Scalars, CleanPlaceMast } from "../../type";

export interface ICleanPlaceMastRepository {
	addCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast>;
	deletePost(cleanPlaceID: Scalars["ID"]): Promise<CleanPlaceMast>;
	updateCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast>;
	fetchCleanPlaceMastByCleanPlaceID(
		cleanPlaceID: Scalars["ID"]
	): Promise<CleanPlaceMast | null>;
	fetchAllCleanPlace(): Promise<CleanPlaceMast[]>;
}

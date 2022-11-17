import { Scalars, CleanPlaceMast } from "../../type";
export interface ICleanPlaceMastRepository {
    addCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast>;
    updateCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast>;
    fetchCleanPlaceMastByCleanPlaceID(CleanPlaceID: Scalars["ID"]): Promise<CleanPlaceMast | null>;
    fetchAllCleanPlace(): Promise<CleanPlaceMast[]>;
}

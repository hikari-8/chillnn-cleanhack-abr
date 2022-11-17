import { ICleanPlaceMastRepository } from "../..";
import { CleanPlaceMast } from "../../entities";
export declare class CleanPlaceMastRepositoryCacheAdaptor implements ICleanPlaceMastRepository {
    private repository;
    private cleanPlaceEachCache;
    private cleanPlaceAllCache;
    constructor(repository: ICleanPlaceMastRepository);
    addCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast>;
    updateCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast>;
    fetchCleanPlaceMastByCleanPlaceID(CleanPlaceID: string): Promise<CleanPlaceMast | null>;
    fetchAllCleanPlace(): Promise<CleanPlaceMast[]>;
    private myCleanPlaceID;
    private updateCacheEach;
    private updateCacheBulk;
    private fetchCacheCleanPlaceMast;
    private fetchCacheCleanPlaceAll;
}

import { IRaffleObjectRepository, RaffleObject, RaffleMast } from "../../entities";
declare type RaffleMastGroupCache = {
    [groupID: string]: {
        [taskID: string]: {
            mast: RaffleMast;
            createdAt: number;
        };
    };
};
declare type RaffleMastRaffleCache = {
    [taskID: string]: {
        mast: RaffleMast;
        createdAt: number;
    };
};
export declare class RaffleObjectRepositoryCacheAdaptor implements IRaffleObjectRepository {
    private repository;
    private groupCache;
    private taskCache;
    constructor(repository: IRaffleObjectRepository, optional?: {
        companyCache: RaffleMastGroupCache;
        taskCache: RaffleMastRaffleCache;
    });
    addRaffleObject(input: RaffleObject): Promise<RaffleObject>;
    updateRaffleObject(input: RaffleObject): Promise<RaffleObject>;
    fetchRaffleObject(groupID: string): Promise<RaffleObject | null>;
    private updateGroupCache;
    private updateRaffleCacheByGroupID;
    private fetchCacheRaffleObject;
}
export {};

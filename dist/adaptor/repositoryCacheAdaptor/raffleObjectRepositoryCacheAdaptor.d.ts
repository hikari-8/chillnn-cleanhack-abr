import { IRaffleObjectRepository, RaffleObject } from "../../entities";
export declare class RaffleObjectRepositoryCacheAdaptor implements IRaffleObjectRepository {
    private repository;
    private groupCache;
    private raffleCache;
    constructor(repository: IRaffleObjectRepository);
    addRaffleObject(input: RaffleObject): Promise<RaffleObject>;
    updateRaffleObject(input: RaffleObject): Promise<RaffleObject>;
    fetchRaffleObject(raffleID: string): Promise<RaffleObject | null>;
    fetchRafflesByGroupID(groupID: string): Promise<RaffleObject[]>;
    private addCacheEach;
    private addCacheBulk;
    private fetchCacheRaffleObject;
    private fetchRaffles;
}

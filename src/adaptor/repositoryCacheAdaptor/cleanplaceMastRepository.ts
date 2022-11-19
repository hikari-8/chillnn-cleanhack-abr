import { ICleanPlaceMastRepository } from "../../entities";
import { Scalars, CleanPlaceMast } from "../../entities";


type CleanPlaceCache = {
  [cleanPlaceID : string]: CleanPlaceMast | "blanc" | undefined;
}
export class CleanPlaceMastRepositoryCacheAdaptor
	implements ICleanPlaceMastRepository
{
  private cleanPlaceCache: CleanPlaceCache = {};
  // private myUserID: string | null = null;
  constructor(private repository: ICleanPlaceMastRepository) {}

	async addCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast> {
		const res = await this.repository.addCleanPlaceMast(input);
    this.addCacheEach(res.cleanPlaceID, res);
    return res;
	}

	async deleteCleanPlaceMast(cleanPlaceID: Scalars["ID"]): Promise<CleanPlaceMast>{
    const res = await this.repository.deleteCleanPlaceMast(cleanPlaceID); 
    res.deletedAt = new Date().getDate();
    this.addCacheEach(res.cleanPlaceID, res);
    return res;
  };

	async updateCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast>{
    const res = await this.repository.updateCleanPlaceMast(input);
    res.updatedAt = new Date().getDate();
    this.addCacheEach(res.cleanPlaceID, res);
    return res;
  };

	async fetchCleanPlaceMastByCleanPlaceID(
		cleanPlaceID: Scalars["ID"]
	): Promise<CleanPlaceMast | null>{

  };
	fetchAllCleanPlace(): Promise<CleanPlaceMast[]>;

	// ===============================================================
	//
	// private
	//
	// ===============================================================

  private addCacheEach (cleanPlaceID: Scalars["ID"], cleanPlace: CleanPlaceMast | null){
    this.cleanPlaceCache[cleanPlaceID] = cleanPlace || "blanc";
    if(!cleanPlace)  return;
  }



  }:
}

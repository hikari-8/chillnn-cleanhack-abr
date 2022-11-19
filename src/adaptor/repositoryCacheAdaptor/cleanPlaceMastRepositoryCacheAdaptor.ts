import { ICleanPlaceMastRepository, RoomMast } from "../../entities";
import { Scalars, CleanPlaceMast } from "../../entities";
import { compareNumDesc } from "../../util";

type RoomCache = {
	[roomID: string]:
		| {
				[cleanPlaceID: string]: CleanPlaceMast;
		  }
		| undefined;
};
type CleanPlaceCache = {
	[cleanPlaceID: string]: CleanPlaceMast | "blanc" | undefined;
};
export class CleanPlaceMastRepositoryCacheAdaptor
	implements ICleanPlaceMastRepository
{
	private cleanPlaceCache: CleanPlaceCache = {};
	private roomCache: RoomCache = {};

	constructor(private repository: ICleanPlaceMastRepository) {}

	async addCleanPlace(input: CleanPlaceMast): Promise<CleanPlaceMast> {
		const res = await this.repository.addCleanPlace(input);
		res.createdAt = new Date().getDate();
		this.addCacheEach(res.cleanPlaceID, res);
		return res;
	}

	async deleteCleanPlace(
		cleanPlaceID: Scalars["ID"]
	): Promise<CleanPlaceMast> {
		const res = await this.repository.deleteCleanPlace(cleanPlaceID);
		res.deletedAt = new Date().getDate();
		this.addCacheEach(res.cleanPlaceID, res);
		return res;
	}

	async updateCleanPlace(input: CleanPlaceMast): Promise<CleanPlaceMast> {
		const res = await this.repository.updateCleanPlace(input);
		res.updatedAt = new Date().getDate();
		this.addCacheEach(res.cleanPlaceID, res);
		return res;
	}

	async fetchCleanPlaceByCleanPlaceID(
		cleanPlaceID: Scalars["ID"]
	): Promise<CleanPlaceMast | null> {
		const cache = this.fetchCleanPlace(cleanPlaceID);
		if (cache && cache === "blanc") {
			return null;
		} else if (cache) {
			return cache;
		}
		const res = await this.repository.fetchCleanPlaceByCleanPlaceID(
			cleanPlaceID
		);
		this.addCacheEach(cleanPlaceID, res);
		return res;
	}

	async fetchCleanPlacesByRoomID(roomID: string): Promise<CleanPlaceMast[]> {
		const cache = this.fetchCleanPlaces(roomID);
		if (cache) return cache;
		const res = await this.repository.fetchCleanPlacesByRoomID(roomID);
		this.addCacheBalk(roomID, res);
		return res;
	}

	// ===============================================================
	//
	// private
	//
	// ===============================================================

	private addCacheEach(
		cleanPlaceID: Scalars["ID"],
		cleanPlace: CleanPlaceMast | null
	) {
		this.cleanPlaceCache[cleanPlaceID] = cleanPlace || "blanc";
		if (!cleanPlace) return;
		const roomCache = this.roomCache[cleanPlace.groupID];
		if (roomCache) {
			roomCache[cleanPlaceID] = cleanPlace;
		}
	}

	private addCacheBalk(roomID: Scalars["ID"], cleanPlaces: CleanPlaceMast[]) {
		this.roomCache[roomID] = {};
		for (const cleanPlace of cleanPlaces) {
			this.addCacheEach(cleanPlace.cleanPlaceID, cleanPlace);
		}
	}

	private fetchCleanPlace(cleanPlaceID: Scalars["ID"]) {
		return this.cleanPlaceCache[cleanPlaceID];
	}

	private fetchCleanPlaces(roomID: Scalars["ID"]) {
		const roomCache = this.roomCache[roomID];
		if (!roomCache) return null;
		return Object.keys(roomCache)
			.map((key) => {
				return roomCache[key];
			})
			.filter((item) => !item.deletedAt);
		// .sort((a, b) => compareNumDesc(a.createdAt, b.createdAt))
	}
}

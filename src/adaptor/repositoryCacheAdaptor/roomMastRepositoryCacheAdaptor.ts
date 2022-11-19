import { IRoomMastRepository, RoomMast, Scalars } from "../../entities";

type Roomcache = {
	[roomID: string]: RoomMast | "blanc" | undefined;
};

export class roomMastRepositoryCacheAdaptor implements IRoomMastRepository {
	private roomEachCache: Roomcache = {};
	private roomAllCache: Roomcache | null = null;
	private myRoomID: string | null = null;
	constructor(private repository: IRoomMastRepository) {}

	async addRoom(input: RoomMast): Promise<RoomMast> {
		const res = await this.repository.addRoom(input);
		res.createdAt = new Date().getDate();
		this.addCacheEach(input.roomID, res);
		this.myRoomID = input.roomID;
		return res;
	}

	async deleteRoom(roomID: string): Promise<RoomMast> {
		const res = await this.repository.deleteRoom(roomID);
		res.deletedAt = new Date().getDate();
		this.addCacheEach(roomID, res);
		return res;
	}

	async updateRoom(input: RoomMast): Promise<RoomMast> {
		const res = await this.repository.updateRoom(input);
		res.updatedAt = new Date().getDate();
		this.addCacheEach(input.roomID, res);
		this.myRoomID = input.roomID;
		return res;
	}

	async fetchRoomByRoomID(roomID: string): Promise<RoomMast | null> {
		const cache = this.fetchRoom(roomID);
		if (cache && cache === "blanc") {
			return null;
		} else if (cache) {
			return cache;
		}
		const res = await this.repository.fetchRoomByRoomID(roomID);
		this.addCacheEach(roomID, res);
		return res;
	}

	// ===============================================================
	//
	// private
	//
	// ===============================================================
	private addCacheEach(roomID: Scalars["ID"], room: RoomMast | null) {
		this.roomEachCache[roomID] = room || "blanc";
		if (this.roomAllCache && room) {
			this.roomAllCache[roomID] = room;
		}
	}

	private fetchRoom(roomID: Scalars["ID"]) {
		return this.roomEachCache[roomID];
	}
}

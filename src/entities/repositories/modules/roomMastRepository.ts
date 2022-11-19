import { Scalars, RoomMast } from "../../type";

export interface IRoomMastRepository {
	addRoomMast(input: RoomMast): Promise<RoomMast>;
	deleteRoomMast(roomID: Scalars["ID"]): Promise<RoomMast>;
	updateRoomMast(input: RoomMast): Promise<RoomMast>;
	fetchRoomMastByRoomID(roomID: Scalars["ID"]): Promise<RoomMast>;
	fetchAllRooms(): Promise<RoomMast[]>;
}

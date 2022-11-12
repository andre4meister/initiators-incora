/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { AxiosPromise } from 'axios';
import { RoomType } from 'types/CommonTypes';
import getRequest from 'utils/getRequest';

interface FetchRoomsType {
  rooms: RoomType[];
}
export interface FetchRoomsProps {
  officeId: number;
  soonestBookingsDays: number;
}
export default class DashboardService {
  static async fetchRooms({
    officeId = 1,
    soonestBookingsDays = 5,
  }: FetchRoomsProps) {
    const response = await getRequest<AxiosPromise<FetchRoomsType>>(
      `https://initiators-ua.herokuapp.com/rooms?officeId=${officeId}&soonestBookingsDays=${soonestBookingsDays}`,
    );

    if (response.status === 200) {
      const body: RoomType[] = (await response.data).data.rooms;
      return body;
    }
    throw new Error('Error occured when rooms fetched');
  }
}

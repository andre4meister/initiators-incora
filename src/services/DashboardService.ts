/* eslint-disable @typescript-eslint/unbound-method */
import { AxiosResponse } from 'axios';
import { RoomType } from 'types/CommonTypes';
import getRequest from 'utils/getRequest';

export interface FetchRoomsType {
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
  }: FetchRoomsProps): Promise<AxiosResponse<FetchRoomsType>> {
    const response = await getRequest<FetchRoomsType>(
      `https://initiators-ua.herokuapp.com/rooms?officeId=${officeId}&soonestBookingsDays=${soonestBookingsDays}`,
    );

    if (response.status === 200) {
      return response;
    }
    throw new Error('Error occured when rooms fetched');
  }
}

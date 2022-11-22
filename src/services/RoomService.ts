/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/unbound-method */
import { AxiosResponse } from 'axios';
import { RoomType } from 'types/CommonTypes';
import getRequest from 'utils/getRequest';

export interface FetchRoomsType {
  data: {
    rooms: RoomType[];
  };
}
export interface FetchRoomsProps {
  officeId: number;
  soonestBookingsDays: number;
}
export default class RoomService {
  static async fetchRooms({
    officeId = 1,
    soonestBookingsDays = 5,
  }: FetchRoomsProps): Promise<AxiosResponse<FetchRoomsType>> {
    const response = await getRequest<FetchRoomsType>(
      `${process.env.REACT_APP_API_ROOMS}?officeId=${officeId}&soonestBookingsDays=${soonestBookingsDays}`,
    );
    if (response.status === 200) {
      return response;
    }
    throw new Error('Error occured when rooms fetched');
  }
}

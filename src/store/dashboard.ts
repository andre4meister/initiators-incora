import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [
    {
      id: 1,
      officeId: 1,
      desciption: 'For camp',
      floor: 1,
      maxPeople: 20,
      minPeople: 8,
      name: 'Headquartes',
      camera: true,
      projector: false,
      tv: true,
    },
    {
      id: 2,
      officeId: 1,
      desciption: 'For all',
      floor: 2,
      maxPeople: 30,
      minPeople: 12,
      name: 'BigOne',
      camera: false,
      projector: false,
      tv: false,
    },
    {
      id: 19,
      officeId: 1,
      desciption: 'Boss is sitting there',
      floor: 1,
      maxPeople: 10,
      minPeople: 2,
      name: 'BossPlace',
      camera: true,
      projector: false,
      tv: true,
    },
    {
      id: 29,
      officeId: 1,
      desciption: 'DreamTeam',
      floor: 2,
      maxPeople: 15,
      minPeople: 5,
      name: 'Heaven',
      camera: true,
      projector: true,
      tv: true,
    },
  ],
};
const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
});

export default dashboard.reducer;
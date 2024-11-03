import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RouteInformation {
  city: string;
  client: string;
  deliveryTime: string;
  refNumber: string;
}

export interface Brick extends RouteInformation {
  id: number;
  xPosition: number;
  yPosition: number;
  isUnloadingPlace: boolean;
}

interface TasksState {
  bricks: Brick[];
}

const initialState: TasksState = {
  bricks: []
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setBricks: (state) => {
      const newBrick = {
        id: Date.now(),
        xPosition: Math.random() * 200,
        yPosition: Math.random() * 200,
        city: 'city',
        client: 'client',
        deliveryTime: '00:00',
        refNumber: 'ref number',
        isUnloadingPlace: false
      }

      state.bricks.push(newBrick);
    },
    setData: (state, action: PayloadAction<{ brickId: number; field: keyof RouteInformation; value: string }>) => {
      const { brickId, field, value } = action.payload;
      const brick = state.bricks.find(brick => brick.id === brickId);
      if (brick) {
        brick[field] = value;
      }
    },
    setIsUnloadingPlace: (state, action: PayloadAction<{brickId: number; isUnloadingPlace: boolean}>) => {
      const {brickId, isUnloadingPlace} = action.payload;
      const brick = state.bricks.find(brick => brick.id === brickId);
      if (brick) {
        brick.isUnloadingPlace = isUnloadingPlace;
      }
    }
  }
});

export default tasksSlice;
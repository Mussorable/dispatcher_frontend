import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Brick {
  id: number;
  xPosition: number;
  yPosition: number;
  city: string;
  client: string;
  deliveryTime: string;
  refNumber: string;
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
        refNumber: 'ref number'
      }

      state.bricks.push(newBrick);
    },
    setCity: (state, action: PayloadAction<{ id: number; newCity: string }>) => {
      const currentBrick = state.bricks.find(brick => brick.id === action.payload.id)
      if (currentBrick) {
        currentBrick.city = action.payload.newCity;
      }
    }
  }
});

export default tasksSlice;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RouteInformation {
  city: string;
  client: string;
  deliveryTime: string;
  refNumber: string;
}

interface TaskInformation {
  id: number;
  text: string;
  isImportant: boolean;
}

export interface Brick extends RouteInformation {
  id: number;
  xPosition: number;
  yPosition: number;
  isUnloadingPlace: boolean;
}

interface TasksState {
  bricks: Brick[];
  tasks: TaskInformation[];
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    bricks: [],
    tasks: []
  } as TasksState,
  reducers: {
    addNewBrick: (state) => {
      const newBrick = {
        id: Date.now(),
        xPosition: Math.random() * 400,
        yPosition: Math.random() * 150,
        city: 'city',
        client: 'client',
        deliveryTime: '00:00',
        refNumber: 'ref number',
        isUnloadingPlace: false
      }

      state.bricks.push(newBrick);
    },
    updateBricks: (state, action: PayloadAction<Brick[]>) => {
      state.bricks = action.payload;
    },
    setData: (state, action: PayloadAction<{ brickId: number; field: keyof RouteInformation; value: string }>) => {
      const { brickId, field, value } = action.payload;
      const brick = state.bricks.find(brick => brick.id === brickId);
      if (brick) {
        if (field === 'city') {
          const regex = /^[a-zA-Z\s-]{0,18}$/g;
          brick[field] = regex.test(value) ? value.toUpperCase() : brick[field];
        } else if (field === 'client') {
          const regex = /^[a-zA-Z0-9\s-]{0,10}$/g;
          brick[field] = regex.test(value) ? value : brick[field];
        } else if (field === 'deliveryTime') {
          let formattedValue = value.replace(/[^0-9]/g, '');

          if (formattedValue.length === 5) {
            formattedValue = formattedValue.slice(0, 5);
          }

          if (formattedValue === '' || formattedValue === ':') {
            formattedValue = '00:00';
          }

          if (formattedValue.length === 2 && !formattedValue.includes(':')) {
            formattedValue = formattedValue + ':';
          } else if (formattedValue.length > 2 && formattedValue[2] !== ':') {
            formattedValue = formattedValue.slice(0, 2) + ':' + formattedValue.slice(2, 4);
          }

          const [hours, minutes] = formattedValue.split(':');
          if (hours && (parseInt(hours) < 0 || parseInt(hours) > 23)) {
            formattedValue = `00:${minutes ? minutes : '00'}`;
          } else if (minutes && (parseInt(minutes) < 0 || parseInt(minutes) > 59)) {
            formattedValue = `${hours ? hours : '00'}:00`;
          }

          brick[field] = formattedValue.slice(0, 5);
        } else if (field === 'refNumber') {
          const regex = /^[a-zA-Z0-9\s-;:]{0,30}$/g;
          brick[field] = regex.test(value) ? value : brick[field];
        }
      }
    },
    setIsUnloadingPlace: (state, action: PayloadAction<{brickId: number; isUnloadingPlace: boolean}>) => {
      const {brickId, isUnloadingPlace} = action.payload;
      const brick = state.bricks.find(brick => brick.id === brickId);
      if (brick) {
        brick.isUnloadingPlace = isUnloadingPlace;
      }
    },
    setBrickPosition: (state, action: PayloadAction<{brickId: number; xPosition: number; yPosition: number}>) => {
      const {brickId, xPosition, yPosition} = action.payload;
      const brick = state.bricks.find(brick => brick.id === brickId);
      if (brick) {
        brick.xPosition = xPosition;
        brick.yPosition = yPosition;
      }
    },
    addTask: (state) => {
      state.tasks = [
        {
          id: Date.now(),
          text: '',
          isImportant: false
        },
        ...state.tasks,
      ];
    },
    setTaskText: (state, action: PayloadAction<{id: number; text: string}>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      state.tasks.splice(index, 1);
    },
    setImportance: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isImportant = !task.isImportant;
      }
    }
  }
});

export default tasksSlice;
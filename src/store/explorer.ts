import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExplorerItem {
    title: string;
}

interface ExplorerObject extends ExplorerItem {
    isFolder: false;
    content: string;
}

interface ExplorerFolder extends ExplorerItem {
    isFolder: true;
    isUnwrapped: boolean;
    children: ExplorerItem[];
}

interface ExplorerState {
    storage: { [key: string]: ExplorerObject | ExplorerFolder };
}

const explorerSlice = createSlice({
    name: "explorer",
    initialState: {
        storage: {}
    } as ExplorerState,
    reducers: {
        createFolder: (state, action: PayloadAction<ExplorerFolder>) => {
            state.storage[action.payload.title] = action.payload;
        },
        createObject: (state, action: PayloadAction<ExplorerObject>) => {
            state.storage[action.payload.title] = action.payload;
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            delete state.storage[action.payload];
        }
    }
});

export default explorerSlice;
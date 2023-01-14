import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  setDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const addData = createAsyncThunk("todo/add", async (data) => {
  console.log(data);
  try {
    await setDoc(doc(db, "todo", data?.id.toString()), data);

    return data;
  } catch (e) {
    console.error("Error adding document: ", e);
    return e;
  }
});

const getData = createAsyncThunk("todo/get", async (_, { rejectWithValue }) => {
  try {
    const allData = [];
    const querySnapshot = await getDocs(collection(db, "todo"));
    querySnapshot.forEach((doc) => {
      allData.push(doc.data());
    });
    console.log(allData);
    return allData;
  } catch (e) {
    console.error("Error adding document: ", e);
    return rejectWithValue(e);
  }
});

const updateTodo = createAsyncThunk("todo/update", async ({ id, done }) => {
  console.log(done);
  try {
    const ref = doc(db, "todo", `${id}`);
    await updateDoc(ref, {
      done,
    });

    return "";
  } catch (e) {
    console.error("Error adding document: ", e);
    return e;
  }
});

const initialState = {
  isLoading: false,
  dataList: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // addTodo: (state, action: PayloadAction<string>) => {
    //   const todoObj: Todo = {
    //     done: false,
    //     text: action.payload,
    //   };
    //   state.push(todoObj);
    // },
    // doneTodo: (state, action: PayloadAction<number>) => {
    //   state[action.payload].done = !state[action.payload].done;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(addData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addData.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      // state.dataList.push(action.payload);
    });
    builder.addCase(addData.rejected, (state, { payload }) => {
      state.isLoading = false;
    });

    builder.addCase(getData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.dataList = action.payload?.reverse();
    });
    builder.addCase(getData.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
  },
});

export { addData, getData, updateTodo };

// export const { addTodo, doneTodo } = todoSlice.actions;

export default todoSlice.reducer;

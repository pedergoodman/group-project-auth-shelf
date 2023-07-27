import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_ITEMS" actions
function* fetchItems() {
  try {
    const response = yield axios.get("/api/shelf");
    yield put({ type: "SET_ITEMS", payload: response.data });
  } catch (error) {
    console.log("Error in items GET request: ", error);
  }
}

function* addItem(action) {
  try {
    const itemToAdd = yield axios.post("/api/shelf", action.payload);
    yield put({ type: "FETCH_ITEMS" });
  } catch (error) {
    console.log("Error adding item to shelf:", error);
  }
}

function* deleteItem(action) {
  
  try {

    yield axios.delete(`/api/shelf/${action.payload}`);

    yield put({ type: "FETCH_ITEMS" });
  } catch (error) {
    console.log("Error deleting item from shelf:", error);
  }
}

function* shelfSaga() {
  yield takeLatest("FETCH_ITEMS", fetchItems);
  yield takeLatest("ADD_ITEM", addItem);
  yield takeLatest("DELETE_ITEM", deleteItem);
}

export default shelfSaga;

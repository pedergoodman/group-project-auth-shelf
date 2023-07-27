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

function* shelfSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems);
}

export default shelfSaga;
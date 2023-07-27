import { useSelector } from "react-redux";
import items from "../redux/reducers/item.reducer";
//These aren't used in the project, but are something you could use

//Custom Hook -- uses other hooks
const useReduxStore = () => {
  //accesses the useSelector hook and gives back entire store
  return useSelector((store) => store);
};

/*
EXAMPLE FOR A SELECTOR THAT GETS SOMETHING SPECIFIC

const useUser = () => {
  return useSelector(store => store.user)
}
*/

const useItems = () => {
  return useSelector((store) => store.items);
};

export default useReduxStore;

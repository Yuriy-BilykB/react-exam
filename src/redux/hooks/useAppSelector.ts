import {useSelector} from "react-redux";
import {store} from "../store/Store.ts";
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();
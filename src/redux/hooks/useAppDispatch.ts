import {useDispatch} from "react-redux";
import {store} from "../store/Store.ts";


export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
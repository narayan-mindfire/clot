import { logout } from "../slices/authSlice";
export const RESET_STATE = "RESET_STATE";
import { persistor } from "../store";
export const resetMiddleware = ({dispatch}) => (next : any) => async (action: { type: string; }) => {
    if (action.type === RESET_STATE) {
        dispatch(logout());
        await persistor.purge();
    }
    return next(action);
};
export const resetState = () => ({
    type: RESET_STATE,
});
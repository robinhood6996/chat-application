import { useSelector } from "react-redux";


export const useAuth = () => {
    const auth = useSelector(state => state.auth);
    if(auth && auth.accessToken && auth.user){
        return true
    }
    return false
};

import { useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"

const useAuth = () => {
    const token = useSelector((state) => state.auth.token)

    try {
    const obj = jwtDecode(token)
    console.log("obj: ", obj);
    return [obj];
    } catch (err) {
        console.error("Invalid token:", err);
        return [null];
    }

}

export default useAuth;
import { isAuth } from "../utils/selectors"
import { removeError } from "../store/authSlice"
import { PATHS } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"

export const useAuthWatcher = () => {
    const isAuthenticated = useSelector(isAuth)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isAuthenticated) {
            navigate(PATHS.HOME)
        }
        else if(!isAuthenticated) {
            if (location.pathname === PATHS.FAVORITES || location.pathname === PATHS.HISTORY) {
                    navigate(PATHS.SIGNIN)
                }
        }
        else if(location.pathname === PATHS.SIGNIN || location.pathname === PATHS.SIGNUP) {
            dispatch(removeError())
        }
    }, [isAuth, location.pathname, navigate, dispatch])
}
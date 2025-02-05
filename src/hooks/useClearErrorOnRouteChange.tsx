import { useDispatch } from "react-redux"
import { useLocation } from "react-router"
import { removeError } from "../store/authSlice"
import { useEffect } from "react"

export const useErrorClearOnRouteCange = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(removeError())
    }, [location, dispatch])
}
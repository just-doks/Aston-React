import {Header} from "./Header"

type HeaderContainerProps = {
    isAuth?: boolean,
    userName?: string
}

export const HeaderContainer = ({isAuth, userName}: HeaderContainerProps) => <Header isAuth={true} userName='User' />

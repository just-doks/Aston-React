import Header from "./Header"

type HeaderContainerProps = {
    isAuth?: boolean,
    userName?: string
}

const HeaderContainer = ({isAuth, userName}: HeaderContainerProps) => <Header isAuth={true} userName='User' />

export default HeaderContainer
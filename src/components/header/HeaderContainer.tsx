import Header from "./Header"

type HeaderContainerProps = {
    isAuth?: boolean,
    userName?: string
}

const HeaderContainer = ({isAuth, userName}: HeaderContainerProps) => {
    return <Header isAuth={true} userName='User' />
}

export default HeaderContainer
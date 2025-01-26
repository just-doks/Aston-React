import Header from './Header'

type TProps = {
    isAuth?: boolean,
    userName?: string
}

const HeaderContainer = ({isAuth, userName}: TProps) => {
    return <Header isAuth={true} userName='User' />
}

export default HeaderContainer
import {useAuth} from "../../hooks/useAuth";
import HeaderPrimary from "./Primary";
import HeaderDashboard from "./dashboard";

const Header = () => {
    const {uid} = useAuth();
    if (!uid) {
        return <HeaderPrimary/>
    }
    return <HeaderDashboard/>
}

export default Header;
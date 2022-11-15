import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/lws-logo-dark.svg";
import { userLoggedOut } from "../../features/auth/authSlice";

export default function Navigation() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(userLoggedOut());
        localStorage.removeItem('auth');
    }
    return (
        <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between h-16 items-center">
                    <h2 className="text-xl text-gray-50 font-bold">Inbox</h2>
                    <ul>
                        <li className="text-white">
                            <span className="cursor-pointer" onClick={() => handleLogout()}>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

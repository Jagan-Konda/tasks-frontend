import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import "./index.css";

const Navbar = () => {
    const navigate = useNavigate();


    const logout = () => {
        Cookies.remove("jwt_token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h1>Task Tracker</h1>
            <div>
                <Link to="/">Dashboard</Link>
                <button onClick={logout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;

import { useState, useEffect } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation(); // Hook to detect route changes

    // Close menu when the route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <nav className="">
            <Link to="/" className="tittle">
                <img src="../../../public/img/LogoMudaGroup.png" alt="Img-Logo" />
            </Link>
            <div
                className="menu"
                onClick={() => {
                    setMenuOpen(!menuOpen);
                }}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Profile">Profile</Link>
                </li>
                <li>
                    <a href="/admin">Admin</a>
                </li>
            </ul>
        </nav>
    );
};

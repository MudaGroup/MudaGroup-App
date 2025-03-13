import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <>
            <nav className="top-0 left-0 w-full bg-[#1a1a1a] border-b border-black flex justify-between items-center py-3 px-6 md:px-20 z-[1000]">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        src="/img/LogoMudaGroup.png"
                        alt="Img-Logo"
                        className="w-16 h-auto"
                    />
                </Link>

                <div
    className="flex flex-col space-y-1 cursor-pointer md:hidden relative w-6 z-[1100]"
    onClick={() => setMenuOpen(!menuOpen)}
>
    <span className={`block h-[3px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : "w-6"}`}></span>
    <span className={`block h-[3px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : "w-6"}`}></span>
    <span className={`block h-[3px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : "w-6"}`}></span>
</div>


                {/* Menu */}
                <ul
                    className={`fixed top-0 left-0 w-full h-[50vh] bg-[#1a1a1a] flex flex-col items-center justify-center transition-transform duration-500 ease-in-out z-[1000]
                    ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-[100vh] opacity-0"} 
                    md:static md:flex-row md:h-auto md:w-auto md:space-x-8 md:opacity-100 md:translate-y-0`}
                >
                    <li className="w-full md:w-auto text-center">
                        <Link to="/" className="block text-white text-lg py-3 md:py-2 px-6 hover:bg-gray-700 transition rounded-md">
                            Home
                        </Link>
                    </li>
                    <li className="w-full md:w-auto text-center">
                        <Link to="/Profile" className="block text-white text-lg py-3 md:py-2 px-6 hover:bg-gray-700 transition rounded-md">
                            Profile
                        </Link>
                    </li>
                    <li className="w-full md:w-auto text-center">
                        <a href="/admin" className="block text-white text-lg py-3 md:py-2 px-6 hover:bg-gray-700 transition rounded-md">
                            Admin
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};
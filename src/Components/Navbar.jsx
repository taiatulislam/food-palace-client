import { Link, NavLink } from "react-router-dom";
import logoLight from '../../src/assets/images/logo/logo-light.jpg'

const Navbar = () => {

    const links = <>
        <li><NavLink to='/' style={({ isActive }) => {
            return isActive ? {
                backgroundColor: "transparent", borderBottom: "3px solid salmon",
                color: "salmon", borderRadius: "0", padding: "5px", fontWeight: "600", fontSize: "16px"
            } :
                {
                    color: "salmon", fontWeight: "600", padding: "5px", fontSize: "16px"
                }
        }}>Home</NavLink></li>
        <li><NavLink to='/allFood' style={({ isActive }) => {
            return isActive ? {
                backgroundColor: "transparent", borderBottom: "3px solid salmon",
                color: "salmon", borderRadius: "0", padding: "5px", fontWeight: "600", fontSize: "16px"
            } :
                {
                    color: "salmon", fontWeight: "600", padding: "5px", fontSize: "16px"
                }
        }}>All Food</NavLink></li>
        <li><NavLink to='/blog' style={({ isActive }) => {
            return isActive ? {
                backgroundColor: "transparent", borderBottom: "3px solid salmon",
                color: "salmon", borderRadius: "0", padding: "5px", fontWeight: "600", fontSize: "16px"
            } :
                {
                    color: "salmon", fontWeight: "600", padding: "5px", fontSize: "16px"
                }
        }}>Blog</NavLink></li>
    </>

    return (
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="navbar bg-transparent h-[15vh]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <Link>
                        <img src={logoLight} alt="" className=" w-[90px] rounded" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-10">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex gap-5">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={logoLight} alt="" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                    <Link to='/signUp' className="btn normal-case">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
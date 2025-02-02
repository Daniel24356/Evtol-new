import "./Header.css"
import logo from "../assets/logo-black.webp"
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
        <nav className="header">
            <div>
                <img className="logo-img" src={logo} alt="" />
            </div>
            <div className="header-mid">
                <div>
                    <p>Home</p>
                    <MdKeyboardArrowDown/>
                </div>
                <div>
                    <Link className="link-me" to="medicine"><p>Medication</p></Link>
                    <MdKeyboardArrowDown/>
                </div>
                <div>
                    <p>Dealers</p>
                    <MdKeyboardArrowDown/>
                </div>
                <div>
                    <p>Pages</p>
                    <MdKeyboardArrowDown/>
                </div>
                <div>
                    <p>News</p>
                    <MdKeyboardArrowDown/>
                </div>
                <div>
                    <p>Contact</p>
                    <MdKeyboardArrowDown/>
                </div>
            </div>
            <div>
                <button>Book a Test Drive</button>
            </div>
        </nav>
        </>
    )
}

export default Header
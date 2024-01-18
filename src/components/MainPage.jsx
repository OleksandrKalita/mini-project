import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

export const MainPage = () => {
    return (
        <div className="wrapper">
            <header className="header">
                <div className="header__container">
                    <nav className="menu">
                        <ul className="menu__list">
                            <li><NavLink to="/task-mananger" className="menu__link">Main</NavLink></li>
                            <li><NavLink to="/task-mananger/create" className="menu__link">Create</NavLink></li>
                            <li><NavLink to="/task-mananger/account-settings" className="menu__link">Settings</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet/>
        </div>
    );
}
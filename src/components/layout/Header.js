import React from 'react';
import { Link } from 'react-router-dom';
import { withContext } from '../app/AppContext';
import MobileHeader from './MobileHeader';
import MediaQuery from './MediaQuery';
import MenuList from './MenuList';

const MainHeader = (props) => {
    return (
        <div className="main-nav">
            <div className="main-nav__container">
                <MediaQuery 
                    mobile={ <MobileHeader />}
                    desktop={
                        <span className="main-nav__container__logo">
                            <Link to="/">Todo App</Link>
                        </span>}
                />
               
                
                <ul className="main-nav__container__links">
                    {!props.isLogged ? (
                        <div className="main-nav__container__links">
                            <li><Link to="/signin">Sign In</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </div>
                    ) : (
                        <li>
                            <MenuList>
                                <Link to="/" onClick={props.signout}>Sign Out</Link>
                            </MenuList>
                        </li>
                    )} 
                </ul>
            </div> 
        </div>
    )
}

export default withContext(MainHeader);
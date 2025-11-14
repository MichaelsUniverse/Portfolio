import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/icon.svg';
import './Nav.css';

export function Nav(){

    const getUserFromLocalStorage = () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        return token && email ? { token, email } : null;
    }

    const [user, setUser] = useState(getUserFromLocalStorage());
    const location = useLocation();

    useEffect(() => {
        setUser(getUserFromLocalStorage());
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setUser(null);
    }

    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Pixel Art Icon of a Computer Monitor with a Code Editor"
                        />
                    </Link>
                </div>
                { user ? (
                        <div className='nav-links'>
                            <Link to="/">Home</Link>
                            <Link to="/projects">Projects</Link>
                            <Link to="/about">About</Link>
                            <Link to="/education">Education</Link>
                            <Link to="/services">Services</Link>
                            <Link to="/contact">Contact</Link>
                            <div className='auth-link'>
                                <Link to="/" onClick={handleLogout}>Logout</Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='nav-links'>
                                <Link to="/">Home</Link>
                                <Link to="/about">About</Link>
                                <div className='auth-link'>
                                    <Link to="/login">Login</Link>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </nav>
    )
}
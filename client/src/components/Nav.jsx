import { Link } from 'react-router-dom';
import logo from '../assets/icon.svg';
import './Nav.css';

export function Nav(){
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
                <div className='nav-links'>
                    <Link to="/">Home</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/about">About</Link>
                    <Link to="/education">Education</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
        </nav>
    )
}
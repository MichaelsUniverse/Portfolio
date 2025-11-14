import { Link } from 'react-router-dom';
import { Title } from '../../components/Title';
import picture from '../../assets/picture_c.png';
import './Home.css';

export function Home(){
    return (
        <>
        <Title Title="Michael Santiago" Description="Welcome to my page!" />
        <section>
            <div className='home-container'>
                <div className='home-text'>
                    <h1>Hello! I'm Michael.</h1>
                    <p>I build Software and Games.</p>
                </div>
                <div className='home-image'>
                    <Link to="/about">
                        <img
                            src={picture} alt="Portrait of Michael"
                        />
                    </Link>
                </div>
            </div>
        </section>
        </>
    )
}
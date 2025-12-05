import { Download } from 'iconoir-react'
import { Title } from '../../components/Title';
import picture from '../../assets/picture_c.png';
import resume from '../../assets/Michael_Santiago_Resume.pdf';
import './About.css';

export function About(){
    return (
        <>
        <Title Title="About Michael" Description="Learn more about me!" />
        <section>
            <div className='about-container'>
                <div className='about-text'>
                    <h1>About Me</h1>
                    <div>
                        <p>
                            Hi, I’m Michael.
                            <br />
                            <br />
                            I’m studying Software Engineering at Centennial College.
                            Constantly experimenting with code, learning and creating software, Using tools and
                            frameworks that I find interesting to make weird things.
                        </p>
                        <p className='last-updated'>
                            Last Updated Sept 15, 2025
                        </p>
                    </div>
                    <a href={resume} download className='resume-button'>
                        <p>Resume</p>
                        <Download className='icon'/>
                    </a>
                </div>
                <div className='about-image'>
                    <img src={picture} alt="Portrait of Michael" />
                    <div className='text'>
                        <p>
                            <span>Name:</span>
                            Michael Santiago
                        </p>
                        <p>
                            <span>Age:</span>
                            25
                        </p>
                        <p>
                            <span>Occupation:</span>
                            Software Developer
                        </p>
                        <p>
                            <span>Location:</span>
                            Toronto, Canada
                        </p>
                        <p>
                            <span>Interests:</span>
                            Coding, Gaming, Music, Movies & TV
                        </p>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
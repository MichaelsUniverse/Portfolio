import { Github, Linkedin, Mail } from 'iconoir-react'

import './Footer.css'

export function Footer(){
    return (
        <footer>
            <div className='footer-container'>
                <div className='socials'>
                    <a href='https://www.linkedin.com/in/michaelksantiago/' target="_blank" rel="noopener noreferrer">
                        <Linkedin />
                    </a>
                    <a href='https://github.com/MichaelsUniverse' target="_blank" rel="noopener noreferrer">
                        <Github />
                    </a>
                    <a href='mailto:msanti23@my.centennialcollege.ca' target="_blank" rel="noopener noreferrer">
                        <Mail />
                    </a>
                </div>
                <div className='copyright'>
                    <p>© 2025 Michael Santiago</p>
                </div>
            </div>
        </footer>
    )
}
import { Title } from '../components/Title';
import { SendMail } from 'iconoir-react';
import './Services.css'

export function Services(){
    return (
        <>
        <Title Title="Michael's Services" Description="Discover the services I offer!" />
        <section className='services'>
            <header>
                <h1>Services</h1>
            </header>
            <div className='service-list'>
                <div className='service-item'>
                    <div>
                        <h2>Backend Development</h2>
                        <p>Designing and implementing robust REST APIs, database schemas, authentication, and server logic.</p>
                    </div>
                    <br />
                    <a className='links' href="mailto:msanti23@my.centennialcollege.ca?subject=Backend Development Inquiry">
                        <p>Inquire Service</p>
                        <SendMail className='icon'/>
                    </a>
                </div>
                <div className='divider-line' />
                <div className='service-item'>
                    <div>
                        <h2>Frontend Development</h2>
                        <p>Building responsive, accessible, and user interfaces with modern frameworks.</p>
                    </div>
                    <br />
                    <a className='links' href="mailto:msanti23@my.centennialcollege.ca?subject=Frontend Development Inquiry">
                        <p>Inquire Service</p>
                        <SendMail className='icon'/>
                    </a>
                </div>
                <div className='divider-line' />
            </div>
        </section>
        </>
    )
}
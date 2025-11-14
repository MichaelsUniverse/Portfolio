import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Title';
import { apiUrl } from '../../config/api';
import './Contact.css'

export function Contact(){
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;

        setContactForm({
            ...contactForm,
            [name]: value
        });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/contacts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(contactForm)
            });

            if (!response.ok) {
                throw new Error('Failed to save contact');
            }

            navigate('/');
        } catch (error) {
            console.error('Error saving contact', error);
        }
    }

    return (
        <>
        <Title Title="Contact Michael" Description="Get in touch with me!" />
        <section className='contact'>
            <header>
                <h1>Contact Me</h1>
            </header>
            <div>
                <form onSubmit={handleSubmit} className='contact-form'>
                    <div className='form-row'>
                        <div className='form-group'>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required placeholder='John Doe' onChange={handleChange}/>
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required placeholder='john@email.com' onChange={handleChange}/>
                        </div>
                    </div>
                    <br />
                    <div className='form-group'>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" required onChange={handleChange}
                            rows={20} cols={96} style={{ resize: 'vertical' }}
                        />
                    </div>
                    <br />
                    <button type="submit">Send</button>
                </form>
            </div>
        </section>
        </>
    )
}
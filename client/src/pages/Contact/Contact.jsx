import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Title';
import './Contact.css'

export function Contact(){
    const navigate = useNavigate();

    const onSubmit = (e) => {
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value
        }

        console.log("Form submitted");
        console.log("Form Data: ", data);

        navigate('/'); // Redirect to home page after submission
    }

    return (
        <>
        <Title Title="Contact Michael" Description="Get in touch with me!" />
        <section className='contact'>
            <header>
                <h1>Contact Me</h1>
            </header>
            <div>
                <form onSubmit={onSubmit} href="/">
                    <div className='form-row'>
                        <div className='form-group'>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required placeholder='John Doe'/>
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required placeholder='john@email.com' />
                        </div>
                    </div>
                    <br />
                    <div className='form-group'>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" required
                            rows={10} cols={50} style={{ resize: 'vertical' }}
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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/Title';
import './login.css'

export function Login(){
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submitting form:', form);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            })

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.user.email);

            navigate('/');

        } catch (error) {
            setError(true);
        }
    }

    return (
        <>
        <Title Title="Login" Description="Login form" />
        <section className='login'>
            <form onSubmit={handleSubmit} href="/">
                <div className='form-group'>
                    <label htmlFor="email">
                        <p>Email</p>
                    </label>
                    <input type="email" id="email" name="email" required onChange={handleChange} />
                </div>
                <br />
                <div className='form-group'>
                    <label htmlFor="password">
                        <p>Password</p>
                    </label>
                    <input type="password" id="password" name="password" required onChange={handleChange} />
                    { error && <p className='error'>Invalid Email or Password</p> }
                </div>
                <br />
                <button type="submit">Login</button>
            </form>
        </section>
        </>
    )
}
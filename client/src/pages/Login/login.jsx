import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Title';
import './login.css'

export function Login(){
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [signup, setSignup] = useState(false);

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                })
            })

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.user.email);

            navigate('/');

        } catch (error) {
            setError(error.message);
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                })
            })

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.user.email);

            navigate('/');

        } catch (error) {
            setError(error.message);
        }
    }

    const toggleSignup = () => {
        setSignup(!signup);
        setError('');
    }

    return (
        <>
        <Title Title="Login" Description="Login form" />
        <section className='login'>
            <h2>{signup ? "Sign Up" : "Login"}</h2>
            <form href="/">
            { signup &&
                <div className='form-group'>
                    <label htmlFor="email">
                        <p>Username</p>
                    </label>
                    <input type="name" id="name" name="name" required onChange={handleChange} />
                </div>
            }
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
                    { error && <p className='error'>{error}</p> }
                </div>
                <br />
                <div className='form-btns'>
                    <button type="button" onClick={(e) => { signup ? handleSignup(e) : toggleSignup()} }>
                        Sign Up
                    </button>
                    { !signup && <button type="submit" onClick={handleLogin}>Login</button>}
                </div>
            </form>
        </section>
        </>
    )
}
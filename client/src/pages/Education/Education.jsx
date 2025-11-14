import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Title.jsx';
import { EducationCard } from '../../components/Education/EducationCard.jsx';
import './Education.css';

export function Education(){
    const [educations, setEducations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEducations = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch('/api/education', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(data.message)
                }

                const data = await response.json();
                setEducations(data);

            } catch (error) {
                console.error(`Error fetching education: ${error.message}`);
            }
        }
        fetchEducations();
    }, [])

    return (
        <>
        <Title Title="Michael's Education" Description="My academic background and achievements!" />
        <section className='education'>
            <header>
                <h1>Education</h1>
            </header>
            <div className='education-list'>
                {educations.map((edu) => (
                    <>
                        <EducationCard
                            key={edu._id}
                            School={edu}
                        />
                    </>
                ))}
            </div>
            <button className='new-education-btn' onClick={() => navigate('/education-details')}>
                New Education
            </button>
        </section>
        </>
    )
}
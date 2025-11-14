import { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../components/Title';
import './educationDetails.css'

export function EducationDetails(){
    const [education, setEducation] = useState({
        title: '',
        degree: '',
        school: '',
        gpa: '',
        startDate: '',
        endDate: '',
        estend: '',
        color: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchEducation = async () => {
                const token = localStorage.getItem('token');

                if (!token) {
                    navigate('/login');
                    return;
                }

                try {
                    const response = await fetch(`/api/education/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch project');
                    }

                    const data = await response.json();

                    console.log("data:", data);

                    const toDateInput = (value) =>
                                value ? new Date(value).toISOString().slice(0, 10) : '';

                    setEducation({
                        title: data.title,
                        degree: data.degree,
                        school: data.school,
                        gpa: data.gpa,
                        startDate: toDateInput(data.startDate),
                        endDate: toDateInput(data.endDate),
                        estend: toDateInput(data.estend),
                        color: data.color
                    });

                    console.log(education)

                } catch (error) {
                    console.error('Error fetching education', error);
                }
            }

            fetchEducation();
        }
    }, [id]);

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setEducation({ ...education, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/education/${id}` : `/api/education`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(education)
            });

            if (!response.ok) {
                throw new Error('Failed to save education');
            }

            navigate('/education');
        } catch (error) {
            console.error('Error saving education', error);
        }
    }

    return (
        <>
        <Title Title="Education Details" Description="Edit or Create Education" />
        <section className='project-details'>
            <h2>Education Details</h2>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <div className='form-section'>
                        <div className='form-group'>
                            <label htmlFor="title">
                                <p>Title</p>
                            </label>
                            <input type="text" id="title" name="title" required onChange={handleChange} value={education.title}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="degree">
                                <p>Degree</p>
                            </label>
                            <input type="text" id="degree" name="degree" onChange={handleChange} value={education.degree}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="school">
                                <p>School</p>
                            </label>
                            <input type="text" id="school" name="school" required onChange={handleChange} value={education.school}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="gpa">
                                <p>GPA</p>
                            </label>
                            <input type="text" id="gpa" name="gpa" onChange={handleChange} value={education.gpa}/>
                        </div>
                    </div>
                    <div className='form-section'>
                        <div className='form-group'>
                            <label htmlFor="startDate">
                                <p>Start Date</p>
                            </label>
                            <input type="date" id="startDate" name="startDate" required onChange={handleChange} value={education.startDate}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="endDate">
                                <p>End Date</p>
                            </label>
                            <input type="date" id="endDate" name="endDate" onChange={handleChange} value={education.endDate}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="estend">
                                <p>Estimated End Date</p>
                            </label>
                            <input type="date" id="estend" name="estend" onChange={handleChange} value={education.estend}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="color">
                                <p>Color</p>
                            </label>
                            <input type="color" id="color" name="color" required onChange={handleChange} value={education.color}/>
                        </div>
                    </div>
                </div>
                <br />
                <div className='form-btns'>
                    <button type="submit">
                        { id ? "Save" : "Create" }
                    </button>
                </div>
            </form>
        </section>
        </>
    )
}
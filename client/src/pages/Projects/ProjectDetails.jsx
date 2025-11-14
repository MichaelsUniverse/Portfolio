import { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../components/Title';
import { apiUrl } from '../../config/api';
import './projectDetails.css'

export function ProjectDetails(){
    const [project, setProject] = useState({
        title: '',
        description: '',
        techStack: '',
        link: '',
        repo: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchProject = async () => {
                const token = localStorage.getItem('token');

                if (!token) {
                    navigate('/login');
                    return;
                }

                try {
                    const response = await fetch(`${apiUrl}/projects/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch project');
                    }

                    const data = await response.json();

                    setProject({
                        title: data.project.title,
                        description: data.project.description,
                        techStack: data.project.techStack,
                        link: data.project.link,
                        repo: data.project.repo
                    });

                } catch (error) {
                    console.error('Error fetching project', error);
                }
            }

            fetchProject();
        }
    }, [id]);

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setProject({ ...project, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUrl}/projects/${id}` : `${apiUrl}/projects`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(project)
            });

            if (!response.ok) {
                throw new Error('Failed to save project');
            }

            navigate('/projects');
        } catch (error) {
            console.error('Error saving project', error);
        }
    }

    return (
        <>
        <Title Title="Project Details" Description="Edit or Create Project" />
        <section className='project-details'>
            <h2>Project Details</h2>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <div className='form-section'>
                        <div className='form-group'>
                            <label htmlFor="title">
                                <p>Title</p>
                            </label>
                            <input type="text" id="title" name="title" required onChange={handleChange} value={project.title}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="description">
                                <p>Description</p>
                            </label>
                            <textarea id="description" name="description" required rows="7" onChange={handleChange} value={project.description}/>
                        </div>
                    </div>
                    <div className='form-section'>
                        <div className='form-group'>
                            <label htmlFor="tech stack">
                                <p>Tech Stack</p>
                            </label>
                            <input type="text" id="techStack" name="techStack" required onChange={handleChange} value={project.techStack}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="link">
                                <p>Link</p>
                            </label>
                            <input type="text" id="link" name="link" onChange={handleChange} value={project.link}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="repo">
                                <p>Repo</p>
                            </label>
                            <input type="text" id="repo" name="repo" onChange={handleChange} value={project.repo}/>
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
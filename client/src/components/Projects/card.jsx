import { useNavigate } from 'react-router-dom';
import './card.css'

export default function Card({ project }) {
    const navigate = useNavigate();

    const {
        title,
        description,
        techStack,
        link,
        repo
    } = project;

    const tech = techStack.split(',').map(t => t.trim());

    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            console.error('No token found, redirecting to login');
            return;
        }

        try {
            const response = await fetch(`/api/projects/${project._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete project');
            }

            navigate(0); // Refresh the page to reflect changes

        } catch (error) {
            console.error(`Error deleting project: ${error.message}`);
        }
    }

    return (
        <>
            <div className="card-container">
                <div className="card-details">
                    <div>
                        <h2 className="title">{title}</h2>
                        <p className="description">{description}</p>
                    </div>
                    <ul className="tech-stack">
                        <h3>Built With</h3>
                        <div className='languages'>
                            {tech.map(t => (
                                <li key={t} className="tech">| {t}</li>
                            ))}
                            <p>|</p>
                        </div>
                    </ul>
                    <div className="project-links">
                        {link && (
                            <>
                                <a
                                    href={link}
                                    target="_blank"
                                >
                                    Site
                                </a>
                            </>
                        )}
                        {repo && (
                            <a
                                href={repo}
                                target="_blank"
                            >
                                Repo
                            </a>
                        )}
                    </div>
                    <div className="project-actions">
                        <a
                            onClick={() => navigate(`/project-details/${project._id}`)}
                            target="_blank"
                        >
                            Edit Project
                        </a>
                        <a
                            onClick={handleDelete}
                            target="_blank"
                        >
                            Delete Project
                        </a>
                    </div>
                    </div>
            </div>
            <div className='divider-line'/>
        </>
    )
}
import { useNavigate } from 'react-router-dom';
import './educationcard.css';

export function EducationCard({ School }){
    const navigate = useNavigate();

    const {
        title,
        degree,
        school,
        gpa,
        color
    } = School;

    let { startDate, endDate, estend } = School;

    startDate = new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    endDate = endDate ? new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : null;
    estend = estend ? new Date(estend).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : null;

    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            console.error('No token found, redirecting to login');
            return;
        }

        try {
            const response = await fetch(`/api/education/${School._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete education');
            }

            navigate(0); // Refresh the page to reflect changes

        } catch (error) {
            console.error(`Error deleting project: ${error.message}`);
        }
    }

    return (
        <>
            <div className="education-container"
                style={{ '--bg-hover': color + '33' }}
            >
                <div className="school">
                    <div className="school-details">
                        <div className="school-info">
                            <h2 className='school-name'>{title}</h2>
                            <div>
                                <p>{school}</p>
                                <p>{degree}</p>
                            </div>
                        </div>
                        <div className="school-dates">
                            <p>{startDate} - {endDate ? endDate : "Current"}</p>
                            <p>{estend ? `End: ${estend}` : ""}</p>
                            <p>{gpa ? `GPA: ${gpa}` : ""}</p>
                        </div>
                    </div>
                    <a
                            onClick={() => navigate(`/education-details/${School._id}`)}
                            target="_blank"
                        >
                            Edit Education
                        </a>
                        <a
                            onClick={handleDelete}
                            target="_blank"
                        >
                            Delete Education
                        </a>
                </div>
                <div className='divider'/>
            </div>
        </>
    )
}
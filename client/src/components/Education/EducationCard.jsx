import './educationcard.css';

export function EducationCard({ School }){

    const {
        program,
        school,
        degree,
        startDate,
        endDate,
        estend,
        gpa
    } = School;

    return (
        <>
            <div className="education-container"
                style={{ '--bg-hover': School.color }}
            >
                <div className="school">
                    <div className="school-details">
                        <div className="school-info">
                            <h2 className='school-name'>{program}</h2>
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
                </div>
                <div className='divider'/>
            </div>
        </>
    )
}
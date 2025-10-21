import { ArrowEmailForward } from 'iconoir-react';
import './card.css'

export default function Card({ project }) {
    const {
        image,
        title,
        description,
        tech,
        link,
        repo,
        live
    } = project;

    return (
        <>
            <div className="card-container">
                {image && (
                    <img src={image}/>
                )}
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
                        {live && link && (
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
                    </div>
            </div>
            <div className='divider-line'/>
        </>
    )
}
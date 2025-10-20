import { Title } from '../components/Title';
import { EducationCard } from '../components/Education/EducationCard';
import './Education.css';

import education_list from '../data/education.js';

export function Education(){
    return (
        <>
        <Title Title="Michael's Education" Description="My academic background and achievements!" />
        <section className='education'>
            <header>
                <h1>Education</h1>
            </header>
            <div className='education-list'>
                {education_list.map((school, index) => (
                    <>
                        <EducationCard
                            key={index}
                            School={school}
                        />
                    </>
                ))}
            </div>
        </section>
        </>
    )
}
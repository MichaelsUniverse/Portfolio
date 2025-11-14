import Card from '../components/Projects/card';
import { Title } from '../components/Title';
import './Projects.css';

import projects_list from '../data/projects.js';

export function Projects(){
  const user

    return (
      <>
        <Title Title="Michael's Projects" Description="Projects I have worked on" />
        <header>
          <h1>Projects</h1>
        </header>
        <section className="projects-list">
            { /* Render each project card */ }
            {projects_list.map((proj, index) => (
                <Card
                    key={index}
                    project={proj}
                />
            ))}
            {

            }
            <button className='new-project-btn'>
              New Project
            </button>
            <p className='more'>More Projects TBA</p>
        </section>
      </>
    )
}
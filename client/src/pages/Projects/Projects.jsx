import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Projects/card';
import { Title } from '../../components/Title';
import { apiUrl } from '../../config/api';
import './Projects.css';

export function Projects(){
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
      const fetchProjects = async () => {
          try {
              const token = localStorage.getItem('token');

              if (!token) {
                  navigate('/login');
                  return;
              }

              const response = await fetch(`${apiUrl}/projects`, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  }
              });

              if (!response.ok) {
                  throw new Error(data.message)
              }

              const data = await response.json();
              setProjects(data);

          } catch (error) {
              console.error(`Error fetching projects: ${error.message}`);
          }
      }
      fetchProjects();
  }, [])

  return (
    <>
      <Title Title="Michael's Projects" Description="Projects I have worked on" />
      <header>
        <h1>Projects</h1>
      </header>
      <section className="projects-list">
          { /* Render each project card */ }
          {projects.map((proj) => (
              <Card
                  key={proj._id}
                  project={proj}
              />
          ))}
          <p className='more'>More Projects TBA</p>
          <button className='new-project-btn' onClick={() => navigate('/project-details')}>
            New Project
          </button>
      </section>
    </>
  )
}
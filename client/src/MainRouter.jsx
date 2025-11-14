import { Routes, Route } from 'react-router-dom'
import {
    About, Contact,
    Education, Home,
    Projects, Services,
    Login, ProjectDetails,
    EducationDetails
} from './pages';

const MainRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/education" element={<Education />}/>
                <Route path="/projects" element={<Projects />}/>
                <Route path="/services" element={<Services />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/project-details" element={<ProjectDetails />}/>
                <Route path="/project-details/:id" element={<ProjectDetails />}/>
                <Route path="/education-details" element={<EducationDetails />}/>
                <Route path="/education-details/:id" element={<EducationDetails />}/>
            </Routes>
        </>
    )
}

export default MainRouter;
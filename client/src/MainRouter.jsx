import { Routes, Route } from 'react-router-dom'
import {
    About, Contact,
    Education, Home,
    Projects, Services,
    Login
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
            </Routes>
        </>
    )
}

export default MainRouter;
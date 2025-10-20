import portfolio from '../assets/Projects/portfolio.png'
import dailycrumb from '../assets/Projects/dailycrumb.png'

const projects_list = [
    {
        image: portfolio,
        title: "Portfolio Website",
        description: "Personal portfolio built with Vite-React.",
        tech: ["React", "Vite", "CSS"],
        link: "/",
        repo: "https://github.com/MichaelsUniverse/Portfolio",
        live: true
    },
    {
        image: dailycrumb,
        title: "Daily Crumb",
        description: "Web Project For a Fictional Breakfast Cafe",
        tech: ["HTML", "JS", "CSS"],
        link: "https://daily-crumb.vercel.app/",
        repo: "https://github.com/MichaelsUniverse/Daily-Crumb",
        live: true
    },
    // {
    //     image: dailycrumb,
    //     title: "Daily Crumb",
    //     description: "Web Project For a Fictional Breakfast Cafe",
    //     tech: ["HTML", "JS", "CSS"],
    //     link: "https://daily-crumb.vercel.app/",
    //     repo: "https://github.com/MichaelsUniverse/Daily-Crumb",
    //     live: true
    // }
]

export default projects_list;
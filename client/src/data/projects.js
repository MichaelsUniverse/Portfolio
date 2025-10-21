import portfolio from '../assets/Projects/portfolio.png'
import dailycrumb from '../assets/Projects/dailycrumb.png'
import homelab from '../assets/Projects/homelab.jpg'

const projects_list = [
    {
        image: portfolio,
        title: "Portfolio Website",
        description: "Personal portfolio site",
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
    {
        image: homelab,
        title: "Homelab Setup",
        description: "Personal Homelab Running multiple VMs.",
        tech: ["Proxmox", "Linux"],
        link: "/",
        repo: "",
        live: false
    },
]

export default projects_list;
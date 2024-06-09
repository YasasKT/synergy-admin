import "../css/main.css";
import "../css/projects.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Project as ProjectModel } from "../models/project";
import { HiDotsVertical } from "react-icons/hi";

function Projects() {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("http://localhost:5000/api/projects", {
          method: "GET",
        });
        const projects = await response.json();
        setProjects(projects);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadProjects();
  }, []);

  const togglePopup = (projectId: string) => {
    setActiveProjectId((prevId) => (prevId === projectId ? null : projectId));
  };

  const handleEditClick = () => {};

  const handleDeleteClick = () => {};

  return (
    <div>
      <Header />
      <section className="projects">
        <table className="tbl">
          <thead className="tbl-header">
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Client</th>
              <th>Location</th>
              <th>Year</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          {projects.map((project, index) => (
            <tbody>
              <tr>
                <td>{index + 1}</td>
                <td>{project.type}</td>
                <td>{project.client}</td>
                <td>{project.location}</td>
                <td>{project.year}</td>
                <td>{project.description}</td>
                <td id="menu-container">
                  {activeProjectId === project._id && (
                    <div className="popup-menu">
                      <button className="popup-btn" onClick={handleEditClick}>
                        Edit
                      </button>
                      <button className="popup-btn" onClick={handleDeleteClick}>
                        Delete
                      </button>
                    </div>
                  )}
                  <button
                    className="menu-icon"
                    onClick={() => {
                      togglePopup(project._id);
                    }}
                  >
                    <HiDotsVertical />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </section>
    </div>
  );
}

export default Projects;

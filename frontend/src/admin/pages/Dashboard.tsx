import "../css/main.css";
import "../css/dashboard.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Project } from "../models/project";
import { Client } from "../models/client";
import { Link } from "react-router-dom";

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

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

  useEffect(() => {
    async function loadClients() {
      try {
        const response = await fetch("http://localhost:5000/api/clients", {
          method: "GET",
        });
        const clients = await response.json();
        setClients(clients);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadClients();
  }, []);

  return (
    <>
      <Header 
      user={null}
      onLogoutSuccessful={() => {}}
      />
      <section className="dashboard">
        <div className="left-column">
          <div className="welcome">Welcome, Katudampe</div>
          <div className="notification">You have received 5 messages.</div>
          <div className="link">
            <i className="ri-arrow-right-double-line"></i>See messages
          </div>
        </div>
        <div className="right-column">
          <div className="box-container">
            <Link to="/admin/projects/add">
              <div className="box">
                <div className="icon">
                  <i className="ri-add-box-fill"></i>
                </div>
                <div className="text">New Project</div>
              </div>
            </Link>
            <div className="box">
              <div className="icon">
                <i className="ri-news-fill"></i>
              </div>
              <div className="text">Manage Blogs</div>
            </div>
            <Link to="/admin/clients">
              <div className="box">
                <div className="icon">
                  <i className="ri-shake-hands-fill"></i>
                </div>
                <div className="text">Manage Clients ({clients.length})</div>
              </div>
            </Link>
            <Link to="/admin/projects">
              <div className="box">
                <div className="icon">
                  <i className="ri-bar-chart-box-fill"></i>
                </div>
                <div className="text">All Projects ({projects.length})</div>
              </div>
            </Link>
            <div className="box">
              <div className="icon">
                <i className="ri-mail-fill"></i>
              </div>
              <div className="text">Messages</div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="ri-shield-user-fill"></i>
              </div>
              <div className="text">Admins</div>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
}

export default Dashboard;

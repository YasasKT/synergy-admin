import "../css/main.css";
import "../css/dashboard.css";
import Header from "../components/Header";

function Projects() {
  return (
    <div>
      <Header />
      <section className="dashboard">
        <div className="left-column">
          <div className="welcome">Projects page</div>
          <div className="notification">You have received 5 messages.</div>
          <div className="link">
            <i className="ri-arrow-right-double-line"></i>See messages
          </div>
        </div>
        <div className="right-column">
          <div className="box-container">
            <div className="box">
              <div className="icon">
                <i className="ri-add-box-fill"></i>
              </div>
              <div className="text">New Project</div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="ri-news-fill"></i>
              </div>
              <div className="text">Manage Blogs</div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="ri-shake-hands-fill"></i>
              </div>
              <div className="text">Manage Clients</div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="ri-bar-chart-box-fill"></i>
              </div>
              <div className="text">All Projects</div>
            </div>
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
    </div>
  );
}

export default Projects;

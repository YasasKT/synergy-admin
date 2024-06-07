import Header from "../components/Header";
import "../css/main.css";
import Uploader from "../components/Uploader";

const AddProject = () => {
  return (
    <>
      <Header />
      <section className="page-layout">
        <div className="add-items">
          <h1>Add New Project</h1>
          <div className="form-container">
            <Uploader />
            <div className="input-box-container">
              <div className="title">
                Type<span className="required"> *</span>
              </div>
              <div className="input-box">
                <input type="text" name="type" />
              </div>
            </div>
            <div className="input-box-container">
              <div className="title">
                Client<span className="required"> *</span>
              </div>
              <div className="input-box">
                <input type="text" name="client" />
              </div>
            </div>
            <div className="input-box-container">
              <div className="title">
                Location<span className="required"> *</span>
              </div>
              <div className="input-box">
                <input type="text" name="location" />
              </div>
            </div>
            <div className="input-box-container">
              <div className="title">
                Year<span className="required"> *</span>
              </div>
              <div className="input-box">
                <input type="text" name="year" />
              </div>
            </div>
            <div className="input-area-container">
              <div className="title">Description</div>
              <div className="input-area">
                <textarea name="description" placeholder="Type here..." />
              </div>
            </div>
            <div className="btn-container">
              <button className="add-btn">Add Project</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProject;

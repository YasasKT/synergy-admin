import Header from "../components/Header";
import "../css/main.css";
import Uploader from "../components/Uploader";

const AddClient = () => {
  return (
    <>
      <Header />
      <section className="page-layout">
        <div className="add-items">
          <h1>Add New Client</h1>
          <div className="form-container">
            <Uploader />
            <div className="input-box-container">
              <div className="title">
                Name<span className="required"> *</span>
              </div>
              <div className="input-box">
                <input type="text" name="name" />
              </div>
            </div>
            <div className="btn-container">
              <button className="add-btn">Add Client</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddClient;

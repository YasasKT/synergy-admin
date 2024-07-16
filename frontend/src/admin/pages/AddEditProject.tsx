import Header from "../components/Header";
import "../css/main.css";
import Uploader from "../components/Uploader";
import { Project } from "../models/project";
import { useForm } from "react-hook-form";
import { ProjectInput } from "../../network/projects_api";
import * as ProjectsApi from "../../network/projects_api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AddEditProject = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [existingProject, setExistingProject] = useState<Project | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [defaultImage = existingProject?.imageUrl, setDefaultImage] = useState<
    string | null
  >(null);
  const [showImageError, setShowImageError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<ProjectInput>();

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const project = await ProjectsApi.fetchProject(id);
          setExistingProject(project);
          setDefaultImage(project.imageUrl);
          setImage(null);
          setValue("type", project.type);
          setValue("client", project.client);
          setValue("location", project.location);
          setValue("year", project.year);
          setValue("description", project.description);
        } catch (error) {
          console.error(error);
          alert(error);
        }
      }
    };
    fetchProject();
  }, [id, setValue]);

  const handleImageChange = (file: File | null) => {
    console.log("image changed: ", file);
    setImage(file);
    setShowImageError(false);
  };

  async function onProjectSubmit(input: ProjectInput) {
    if (!image && !defaultImage) {
      setShowImageError(true);
      return;
    }

    try {
      const formData = new FormData();
      if (image) {
        formData.append("imageUrl", image);
      }
      formData.append("type", input.type);
      formData.append("client", input.client);
      formData.append("location", input.location);
      formData.append("year", input.year.toString());
      if (input.description) {
        formData.append("description", input.description);
      }

      if (existingProject) {
        const updatedProject = await ProjectsApi.updateProject(
          existingProject._id,
          formData
        );
        onProjectSave(updatedProject);
      } else {
        const newProject = await ProjectsApi.createProject(formData);
        onProjectSave(newProject);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function onProjectSave(project: Project) {
    console.log("Project Saved: ", project);
    navigate("/admin/projects");
  }

  return (
    <>
      <Header />
      <section className="page-layout">
        <div className="add-items">
          <h1>{existingProject ? "Edit Project" : "Add New Project"}</h1>
          <form
            id="addEditProjectForm"
            onSubmit={handleSubmit(onProjectSubmit)}
            className="form-container"
          >
            <Uploader
              onImageChange={handleImageChange}
              setImage={setImage}
              image={image}
              setDefaultImage={setDefaultImage}
              defaultImage={defaultImage}
              showError={showImageError}
            />
            <div className="input-box-container">
              <div className="title-container">
                <span className="title">Type</span>
                <span className="required">*</span>
              </div>
              <div
                className={`input-box ${
                  errors.type ? "invalid" : dirtyFields.type ? "valid" : ""
                }`}
              >
                <input
                  type="text"
                  {...register("type", { required: "Type is Required" })}
                  autoComplete="off"
                />
                {errors.type && (
                  <p className="error-message">{errors.type.message}</p>
                )}
              </div>
            </div>
            <div className="input-box-container">
              <div className="title-container">
                <span className="title">Client</span>
                <span className="required"> *</span>
              </div>
              <div
                className={`input-box ${
                  errors.client ? "invalid" : dirtyFields.client ? "valid" : ""
                }`}
              >
                <input
                  type="text"
                  {...register("client", { required: "Client is Required" })}
                  autoComplete="off"
                />
                {errors.client && (
                  <p className="error-message">{errors.client.message}</p>
                )}
              </div>
            </div>
            <div className="input-box-container">
              <div className="title-container">
                <span className="title">Location</span>
                <span className="required"> *</span>
              </div>
              <div
                className={`input-box ${
                  errors.location
                    ? "invalid"
                    : dirtyFields.location
                    ? "valid"
                    : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Enter Project Address"
                  {...register("location", {
                    required: "Location is Required",
                  })}
                  autoComplete="off"
                />
                {errors.location && (
                  <p className="error-message">{errors.location.message}</p>
                )}
              </div>
            </div>
            <div className="input-box-container">
              <div className="title-container">
                <span className="title">Year</span>
                <span className="required"> *</span>
              </div>
              <div
                className={`input-box ${
                  errors.year ? "invalid" : dirtyFields.year ? "valid" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Enter Project Year"
                  {...register("year", {
                    required: "Year is Required",
                    validate: {
                      validYear: (value) =>
                        (/^\d{4}$/.test(value.toString()) &&
                          value >= 1900 &&
                          value <= new Date().getFullYear()) ||
                        "Year must be a valid year",
                    },
                  })}
                  autoComplete="off"
                />
                {errors.year && (
                  <p className="error-message">{errors.year.message}</p>
                )}
              </div>
            </div>
            <div className="input-area-container">
              <div className="title-container">
                <span className="title">Description</span>
              </div>
              <div
                className={`input-area ${
                  errors.description
                    ? "invalid"
                    : dirtyFields.description
                    ? "valid"
                    : ""
                }`}
              >
                <textarea
                  placeholder="Type Project Description"
                  {...register("description")}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="btn-container">
              <button
                type="submit"
                form="addEditProjectForm"
                className="add-btn"
                disabled={isSubmitting}
              >
                {existingProject ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddEditProject;

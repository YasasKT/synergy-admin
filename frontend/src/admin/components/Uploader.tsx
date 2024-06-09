import { useRef, useState } from "react";
import "../css/uploader.css";
import { RiImageAddFill } from "react-icons/ri";
import { FaFileImage } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const Uploader = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleFileClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileName(files[0].name);
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const removeImage = () => {
    setFileName("No image selected");
    setImage(null);
  };

  return (
    <div className="uploader-container">
      <form action="" className="uploader" onClick={handleFileClick}>
        <input
          type="file"
          accept="image/*"
          className="input-image"
          ref={inputFileRef}
          hidden
          onChange={handleFileChange}
        />
        {image ? (
          <img src={image} alt={fileName} className="uploaded-image" />
        ) : (
          <>
            <RiImageAddFill className="image-icon" />
            <p>
              Upload an image <span className="required">*</span>
            </p>
          </>
        )}
      </form>
      <div className="uploaded-row">
        <div className="uploaded-content">
          <FaFileImage />
          <div className="uploaded-filename">{fileName}</div>
        </div>
        <MdDelete className="delete-icon" onClick={removeImage} />
      </div>
    </div>
  );
};

export default Uploader;

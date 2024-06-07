import { Link } from "react-router-dom";

const AdminNotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to="/admin">Dashboard</Link>
    </div>
  );
};

export default AdminNotFound;

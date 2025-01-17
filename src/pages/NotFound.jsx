import { useNavigate } from "react-router-dom";

const NotFound = () => {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-error mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-neutral mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <button onClick={() => navigate("/")} className="btn btn-primary">
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;

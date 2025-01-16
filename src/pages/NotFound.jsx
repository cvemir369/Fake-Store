import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center  text-center py-10">
      <h1 className="text-5xl font-bold text-error mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-neutral mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;

import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";

const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="projects-page">
      <div className="container">
        <h1>Проекты</h1>
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project._id} className="project-card">
              <Link to={`/projects/${project._id}`}>
                <h2>{project.title}</h2>
              </Link>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectsPage;
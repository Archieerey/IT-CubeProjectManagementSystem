import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";

const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      <h1>Проекты</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <Link to={`/projects/${project._id}`}>
              <h2>{project.title}</h2>
            </Link>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProjects";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { project, loading, error } = useProject(id);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>Категория: {project.category}</p>
      <p>Студент: {project.student?.name}</p>
      <p>Преподаватель: {project.instructor?.name}</p>
    </div>
  );
};

export default ProjectDetailPage;
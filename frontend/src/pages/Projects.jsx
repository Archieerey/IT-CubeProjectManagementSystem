// import { Link } from "react-router-dom";
// import { useProjects } from "../hooks/useProjects";

// const ProjectsPage = () => {
//   const { projects, loading, error } = useProjects();

//   if (loading) return <div className="loading">Загрузка...</div>;
//   if (error) return <div className="error">Ошибка: {error.message}</div>;

//   return (
//     <div className="projects-page">
//       <div className="container">
//         <h1>Проекты</h1>
//         <ul className="project-list">
//           {projects.map((project) => (
//             <li key={project._id} className="project-card">
//               <Link to={`/project/${project._id}`}>
//                 <h2>{project.title}</h2>
//               </Link>
//               <p>{project.description}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProjectsPage;

import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import CreateProjectModal from "../components/CreateProjectModal";

const ProjectsPage = () => {
  const { projects, loading, error, fetchProjects } = useProjects();
  const { user } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="projects-page">
      <div className="container">
        <h1>Проекты</h1>
        {['admin', 'teacher'].includes(user?.role.title) && (
          <button className="button" onClick={() => setIsOpenModal(true)}>
            Создать проект
          </button>
        )}
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project._id} className="project-card">
              <Link to={`/project/${project._id}`}>
                <h2>{project.title}</h2>
                <div className="meta">
                  <span>Файлов: {project.files.length}</span>
                  <span>Обновлён: {new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </Link>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
      {isOpenModal && <CreateProjectModal setIsOpenModal={setIsOpenModal} fetchProjects={fetchProjects} />}
    </div>
  );
};

export default ProjectsPage;
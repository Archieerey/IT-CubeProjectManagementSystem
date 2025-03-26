import React, { useState } from 'react';
import { createProject } from '../api/api';

const CreateProjectModal = ({ setIsOpenModal, fetchProjects }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (e) => {
        setFiles([...e.target.files]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles([...files, ...droppedFiles]);
    };

    const createProj = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            files.forEach(file => {
                formData.append('files', file);
            });
            await createProject({ title, description });
            setIsOpenModal(false);
            if (typeof fetchProjects === 'function') {
                await fetchProjects();
              }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="createModalContainer">
            <div className="createModal">
                <h1>Создание проекта</h1>
                <input 
                    type="text" 
                    placeholder="Название проекта" 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea 
                    placeholder="Описание проекта" 
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div 
                    className="file-dropzone"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <p>Перетащите файлы сюда или</p>
                    <input 
                        type="file" 
                        multiple 
                        onChange={handleFileUpload}
                    />
                    <div className="file-list">
                        {files.map((file, index) => (
                            <div key={index} className="file-item">
                                <span>{file.name}</span>
                                <span>{Math.round(file.size / 1024)} KB</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="button" disabled={loading} onClick={createProj}>
                    {loading ? 'Создание...' : 'Создать проект'}
                </button>
            </div>
            <div className="modalTrigger" onClick={() => setIsOpenModal(false)}></div>
        </div>
    );
};

export default CreateProjectModal;
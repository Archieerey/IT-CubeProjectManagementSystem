import React, { useState } from 'react';
import { createGallery } from '../api/api';

const CreateGalleryModal = ({ setIsOpenModal, fetchGalleries }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (e) => {
        setFiles([...e.target.files]);
    };

    const createGal = async () => {
        try {
          setLoading(true);
          const formData = new FormData();
          formData.append('name', name);
          formData.append('description', description);
          files.forEach(file => {
            formData.append('photos', file); // Убедитесь, что имя поля 'images'
          });
          
          await createGallery(formData); // Проверьте URL эндпоинта
          setIsOpenModal(false);
          fetchGalleries();
        } catch (error) {
          console.error('Ошибка:', error); // Добавьте логирование
        }
      };

    return (
        <div className="createModalContainer">
            <div className="createModal">
                <h1>Создание галереи</h1>
                <input 
                    type="text" 
                    placeholder="Название галереи" 
                    onChange={(e) => setName(e.target.value)} 
                />
                <textarea 
                    placeholder="Описание галереи" 
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="file-upload">
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileUpload}
                    />
                    <div className="preview">
                        {files.map((file, index) => (
                            <span key={index}>{file.name}</span>
                        ))}
                    </div>
                </div>
                <button type="button" disabled={loading} onClick={createGal}>
                    {loading ? 'Создание...' : 'Создать галерею'}
                </button>
            </div>
            <div className="modalTrigger" onClick={() => setIsOpenModal(false)}></div>
        </div>
    );
};

export default CreateGalleryModal;
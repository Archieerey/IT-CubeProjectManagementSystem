// import React, { useState } from 'react';
// import { createGallery } from '../api/api';


// const CreateGalleryModal = ({ setIsOpenModal, fetchGalleries }) => {
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//     const [files, setFiles] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const handleFileUpload = (e) => {
//         setFiles([...e.target.files]);
//     };
//     console.log(files);

//     const createGal = async () => {
//         if (!name || !description || files.length === 0) {
//           alert('Заполните все поля и загрузите хотя бы одно фото');
//           return;
//         }
      
//         try {
//           setLoading(true);
//           const formData = new FormData();
//           formData.append('name', name);
//           formData.append('description', description);
          
//           // Отправляем только первый файл (если сервер ожидает один файл)
//           formData.append('photo', files[0]); // Изменили 'photos' на 'photo'
          
//           // Или если сервер ожидает массив файлов:
//           // files.forEach(file => formData.append('photos', file));
      
//           const response = await createGallery(formData);
//           console.log('Gallery created:', response);
          
//           setIsOpenModal(false);
//           if (typeof fetchGalleries === 'function') {  // Добавили проверку
//             fetchGalleries();
//           }
//         } catch (error) {
//           console.error('Error:', error.response?.data || error.message);
//           alert(`Ошибка: ${error.response?.data?.message || error.message}`);
//         } finally {
//           setLoading(false);
//         }
//       };

//     return (
//         <div className="createModalContainer">
//             <div className="createModal">
//                 <h1>Создание галереи</h1>
//                 <input 
//                     type="text" 
//                     placeholder="Название галереи" 
//                     value={name}
//                     onChange={(e) => setName(e.target.value)} 
//                     required
//                 />
//                 <textarea 
//                     placeholder="Описание галереи" 
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <div className="file-upload">
//                     <input 
//                         type="file" 
//                         multiple 
//                         accept="image/*" 
//                         onChange={handleFileUpload}
//                         required
//                     />
//                     <div className="preview">
//                         {files.map((file, index) => (
//                             <div key={index}>
//                                 <span>{file.name}</span>
//                                 <span> ({Math.round(file.size / 1024)} KB)</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <button type="button" disabled={loading} onClick={createGal}>
//                     {loading ? 'Создание...' : 'Создать галерею'}
//                 </button>
//             </div>
//             <div className="modalTrigger" onClick={() => setIsOpenModal(false)}></div>
//         </div>
//     );
// };

// export default CreateGalleryModal;

import React, { useState } from 'react';
import { createGallery } from '../api/api';

const CreateGalleryModal = ({ setIsOpenModal, fetchGalleries }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileUpload = (e) => {
        setFiles([...e.target.files]);
    };

    const createGal = async () => {
        if (!name || !description || files.length === 0) {
          setError('Заполните все поля и загрузите хотя бы одно фото');
          return;
        }
      
        try {
          setLoading(true);
          setError(null);
          const formData = new FormData();
          formData.append('name', name);
          formData.append('description', description);
          
          // Отправляем все файлы
          files.forEach(file => {
            formData.append('photos', file);
          });
      
          const response = await createGallery(formData);
          console.log('Gallery created:', response);
          
          setIsOpenModal(false);
          if (typeof fetchGalleries === 'function') {
            await fetchGalleries();
          }
        } catch (error) {
          console.error('Error:', error);
          setError(error.response?.data?.message || 'Ошибка при создании галереи');
        } finally {
          setLoading(false);
        }
    };

    return (
        <div className="createModalContainer">
            <div className="createModal">
                <h1>Создание галереи</h1>
                {error && <div className="error-message">{error}</div>}
                <input 
                    type="text" 
                    placeholder="Название галереи" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    required
                />
                <textarea 
                    placeholder="Описание галереи" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="file-upload">
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileUpload}
                        required
                    />
                    <div className="preview">
                        {files.map((file, index) => (
                            <div key={index}>
                                <span>{file.name}</span>
                                <span> ({Math.round(file.size / 1024)} KB)</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="button" disabled={loading} onClick={createGal}>
                    {loading ? 'Создание...' : 'Создать галереи'}
                </button>
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={() => setIsOpenModal(false)}
                  disabled={loading}
                >
                  Отмена
                </button>
            </div>
        </div>
    );
};

export default CreateGalleryModal;
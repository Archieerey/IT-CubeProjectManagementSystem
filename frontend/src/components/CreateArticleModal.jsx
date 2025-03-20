import React, { useState } from 'react';
import { createArticle } from '../api/api';

const CreateArticleModal = ({ setIsOpenModal, fetchArticles }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const createArti = async () => {
        try {
            setLoading(true)
            await createArticle({ title, content });
            setIsOpenModal(false);
            fetchArticles();
        } catch (error) {
            return false
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="createModalContainer">
            <div className="createModal">
                <h1>Создание статьи :3</h1>
                <input type="text" placeholder='Введите заглавие' onChange={(txt) => setTitle(txt.target.value)} />
                <input type="textarea" placeholder='Введите текст статьи' onChange={(txt) => setContent(txt.target.value)} />
                <button type="button" disabled={loading} onClick={createArti}>Создать</button>
            </div>
            <div className="modalTrigger" onClick={() => setIsOpenModal(false)}></div>
        </div>
    );
};

export default CreateArticleModal;
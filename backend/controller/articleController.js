import Article from "../models/Article.js";

class ArticleController {
  // СОЗДАНИЕ СТАТЬИ
  static async createArticle(req, res) {
    try {
      const { title, content, author } = req.body;

      const newArticle = new Article({
        title,
        content,
        author,
      });

      await newArticle.save();
      return res.status(200).json({ message: "Статья успешно создана!", article: newArticle });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ПОЛУЧЕНИЕ ВСЕХ СТАТЕЙ
  static async getAllArticles(req, res) {
    try {
      const articles = await Article.find().populate("author");
      return res.status(200).json(articles);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ПОЛУЧЕНИЕ СТАТЬИ ПО ID
  static async getArticleById(req, res) {
    try {
      const { id } = req.params;
      const article = await Article.findById(id).populate("author");
      if (!article) {
        return res.status(404).json({ message: "Статья не найдена!" });
      }
      return res.status(200).json(article);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ОБНОВЛЕНИЕ СТАТЬИ
  static async updateArticle(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const article = await Article.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );

      if (!article) {
        return res.status(404).json({ message: "Статья не найдена!" });
      }

      return res.status(200).json({ message: "Статья успешно обновлена!", article });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // УДАЛЕНИЕ СТАТЬИ
  static async deleteArticle(req, res) {
    try {
      const { id } = req.params;
      const article = await Article.findByIdAndDelete(id);
      if (!article) {
        return res.status(404).json({ message: "Статья не найдена!" });
      }
      return res.status(200).json({ message: "Статья успешно удалена!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default ArticleController;
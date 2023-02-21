const { News } = require("../../models/newsModel");
const { BadRequest } = require("http-errors");

async function getNews(req, res) {
  try {
    const { query } = req.query;
    if (query) {
      const filteredNews = await News.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      });
      if (filteredNews.length === 0) {
        return res.status(200).json({ message: "No news found" });
      }
      return res.status(200).json(filteredNews);
    }
    const news = await News.find({});
    return res.status(200).json(news);
  } catch (error) {
    console.log(error);
    throw BadRequest();
  }
}

module.exports = { getNews };

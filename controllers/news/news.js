const { News } = require("../../models/newsModel");
const { BadRequest } = require("http-errors");

async function getNews(req, res) {
  const { limit = 6, page } = req.query;
  const skip = (page - 1) * limit;
  try {
    const allNews = await News.find({});
    const total = allNews.length;
    const news = await News.find({}).sort({ date: -1 }).skip(skip).limit(limit);
    const { query } = req.query;
    if (query) {
      const allNews = await News.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      });
      const total = allNews.length;
      const news = await News.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      })
        .skip(skip)
        .limit(limit);
      if (news.length === 0) {
        return res.status(200).json({ message: "No news found" });
      }

      return res.status(200).json({ news, total });
    }
    return res.status(200).json({ news, total });
  } catch (error) {
    console.log(error);
    throw BadRequest();
  }
}

module.exports = { getNews };

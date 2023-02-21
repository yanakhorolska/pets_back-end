const { News } = require("../../models/newsModel");

async function getNews(req, res) {
  const { limit = 6, page } = req.query;
  const skip = (page - 1) * limit;
  const { query } = req.query;
  if (query) {
    const allNews = await News.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    const total = allNews.length;
    const filteredNews = await News.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(limit);
    if (filteredNews.length === 0) {
      return res.json({
        status: "success",
        data: { message: "No news found" },
      });
    }
    return res.json({ status: "success", data: filteredNews, total });
  }
  const allNews = await News.find({});
  const total = allNews.length;
  const news = await News.find({}).sort({ date: -1 }).skip(skip).limit(limit);
  res.json({ status: "success", data: news, total });
}

module.exports = { getNews };

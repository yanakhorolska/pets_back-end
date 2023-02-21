const { News } = require("../../models/newsModel");

async function getNews(req, res) {
  const { query } = req.query;

  if (query) {
    const filteredNews = await News.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    if (filteredNews.length === 0) {
      return res.json({status: "success", data: { message: "No news found" } });
    }
    return res.json({status: "success", data: filteredNews});
  }

  const news = await News.find({});

  res.json({status: "success", data: news});
}

module.exports = { getNews };

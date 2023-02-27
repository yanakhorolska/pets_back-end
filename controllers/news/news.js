const { News } = require("../../models/newsModel");
const { InternalServerError } = require("http-errors");

async function getNews(req, res) {
  const { limit = 6, page = 1, query: reqQuery } = req.query;

  const queryPage = isNaN(page) ? 1 : Number(page);
  const queryLimit = isNaN(limit) ? 6 : Number(limit);

  const options = {
    skip: (queryPage - 1) * queryLimit,
    limit: queryLimit,
    sort: { date: -1 },
  };

  const query = reqQuery
    ? {
        $or: [
          { title: { $regex: reqQuery, $options: "i" } },
          { description: { $regex: reqQuery, $options: "i" } },
        ],
      }
    : {};

  News.find(query, "", options).exec((err, result) => {
    if (err) {
      return InternalServerError(err.message);
    }

    if (!result.length)
      return res.json({
        status: "success",
        data: { message: "No news found" },
      });

    News.countDocuments(query).exec((countError, count) => {
      if (countError) {
        return InternalServerError(countError.message);
      }
      return res.json({
        status: "success",
        pages: { page: queryPage, total_pages: Math.ceil(count / queryLimit) },
        total: count,
        length: result.length,
        data: result,
      });
    });
  });
}

module.exports = { getNews };

const { Pet } = require('../../models/petModel')

const getAll = async (req, res) => {
  //const {_id : id} = req.user;
  const { page = 1, limit = 10, } = req.query;
  
  const skip = (page - 1) * limit;
  const options = { skip, limit: Number(limit), }

  const query = {}

  Pet.find(query, "-owner -imagesURL -createdAt -updatedAt", options,)
    .exec((err, result) => {
      if (err) {
        return res.json(err.message);
      }
      Pet.estimatedDocumentCount(query).exec((count_error, count) => {
        if (count_error) {
          return res.json(count_error.error);
        }
        return res.json({status : "success", pages : {page, total_pages: Math.ceil(count / limit)}, length: result.length, data : result})
        });
    })
}

module.exports = getAll;
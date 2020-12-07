const Article = require('../Models/articleModel');

// @Desc Get all articls
exports.getArticles = async (req, res) => {
  try {
    Article.get((err, articles) => {
      return res.status(200).json({
        success: true,
        data: articles,
      });
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      err: error.message,
    });
  }
};

// @des add new post

exports.new = async(req, res)=>{
    try {
      console.log("reqBody: ",req.body)
        const article = new Article();
        article.title = req.body.title;
        article.content = req.body.content;
        await article.save();

        return res.status(201).json({
            success: true,
            data: article
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error.message
        })
    }
}


//@des View artcle
exports.view = async (req, res) => {
  try {
    const article = await Article.findById(req.params.article_id);

    if (!article) {
      console.log("error 404, prjocet not found".red);
      return res.status(404).json({
        success: false,
        err: "article is not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    // Error condtion
     return res.status(500).json({
      success: false,
      err: "Server error: " + error.message,
    });
  }
};




// @des delete  article
exports.delete = async function (req, res) {
  try {
    const article = await Article.findById(req.params.article_id);
    if (!article) {
      return res.status(404).json({
        success: false,
        err: "article is not exist",
      });
    }
    await Article.deleteOne({ _id: article._id }, (err) => {
      res.json({
        success: true,
        message: "article deleted",
      });
    });
  } catch (error) {
      res.json({
        err: error.message,
        success:false
        // message: "something worng!"
      });
    
  }
};
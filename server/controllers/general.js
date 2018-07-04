const Page_Categories = require('../models/categories');

const Countries = require('../models/countries');

const UserPageInfo = require('../models/userPageInfo');


exports.savePageCategories = function (req, res, next) {
    const data = req.body;
    // console.log("Data: ", data.categories)
    const pageCategories = new Page_Categories(data);
// console.log("pageCategories: ", pageCategories)
    pageCategories.save((err, post) => {
      if (err) { return next(err); }

      res.status(201).json({
        message: "Record saved successfully"
      });
    });
};

exports.getPageCategories = (req, res, next) => {
    Page_Categories.find({}, (err, categories) => {

    if (err) {
      res.status(500).json({ message: 'Internal server error, Unable to fetch Categories' });
      return next(err);
    }

    return res.status(200).json({ categories: categories, message: "Categories are returned successfully" }); 
  });
}

exports.saveCountries = function (req, res, next) {
    const data = req.body;
    const countries = new Countries(data);
    countries.save((err, post) => {
      if (err) { return next(err); }

      res.status(201).json({
        message: "Record saved successfully"
      });
    });
};

exports.getCountries = (req, res, next) => {
    Countries.find({}, (err, country) => {

    if (err) {
      res.status(500).json({ message: 'Internal server error, Unable to fetch Countries' });
      return next(err);
    }

    return res.status(200).json({ countries: countries, message: "Countries are returned successfully" }); 
  });
}


exports.saveUserPageInfo = function (req, res, next) {
    var userPageInfo = new UserPageInfo({
    pageTitle    : req.body.pageTitle,
    category   : req.body.category,
    subCategory : req.body.subCategory,
    website : req.body.website,
    pageProfilePhoto: {
      fileName: req.body.droppedProfilePhotoFile.file_name,
      fileType: req.body.droppedProfilePhotoFile.file_type,
      fileSize: req.body.droppedProfilePhotoFile.file_size,
      fileData: req.body.droppedProfilePhotoFile.file_data
    },
    pageCoverPhoto: {
      fileName: req.body.droppedCoverPhotoFile.file_name,
      fileType: req.body.droppedCoverPhotoFile.file_type,
      fileSize: req.body.droppedCoverPhotoFile.file_size,
      fileData: req.body.droppedCoverPhotoFile.file_data
    }
  });

  function base64Image(src) {
    return fs.readFileSync(src).toString("base64");
  }

  userPageInfo.save(function (err, userPageInfo) {
    if (err) {
        return res.status(500).json({ message: err.message });
    }
    res.status(200).json({userPageInfo: userPageInfo, message: "Create page info saved successfully"});
  });
};

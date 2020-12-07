const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  
  name: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  source_code: { type: String, required: true },
  img_path: { type: String, required: true },
  description: { type: String, required: true, maxlength: [300, "char shoude be 300"] },
  created_at: { type: Date, default: Date.now },
});

// const Project = module.exports = mongoose.model("project", projectSchema);

// module.exports= Project = mongoose.model("projects", projectSchema);

// module.exports.get = function (callback, limit) {
//   Project.find(callback).limit(limit);
// };

// module.exports = mongoose.model("projects", projectSchema);   

const Project = (module.exports = mongoose.model("project", projectSchema));
module.exports.get = (callback, limit) => {
  Project.find(callback).limit(limit);
};
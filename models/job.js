const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyLogo: String,
  companyName: String,
  jobTitle: String,
  jobType: String, // Internship or Full time
  noOfEmployees: String,
  description: String,
  skills: [String],
});

module.exports = mongoose.model("Job", jobSchema);

const yup = require("yup");
const projectSchema = require("../models/project.schema");

const mongoose = require("../utils/mongoDB");
const { schemaValidator } = require("../utils/schemaValidator");
const { errorResponse } = require("../utils/errorHandler");

module.exports.createProject = async (req, res) => {
  try {
    // validate request body
    const schema = yup.object().shape({
      projectName: yup.string().required("Project name is required"),
      owner: yup.string().required("owner  is required"),
    });
    let validation = await schemaValidator(req.body, schema);

    if (!validation.status) {
      return errorResponse(res, validation.error, 400);
    }

    const project = new projectSchema(req.body);
    await project.save();
    res.status(200).json({message:'project created successfully'})
  } catch (err) {
    console.log(err);
    return errorResponse(res, err.message, 500);
  }
};

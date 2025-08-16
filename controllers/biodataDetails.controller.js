import bioDataDetails from "../models/biodataDetails.model.js";
import mongoose from "mongoose";
const addBioData = async (req, res) => {
  try {
    const { name, dob, pob, education, work, contactNo, email, address, template } = req.body;
    console.log(req.body)
    const photoUrl = req.file?.path;

    const newBioData = new bioDataDetails({
      name,
      dob,
      pob,
      education,
      work,
      contactNo,
      email,
      address,
      template: new mongoose.Types.ObjectId(template),
      photo: photoUrl,
    });

    await newBioData.save();

    return res.status(201).json({
      success: true,
      message: "Biodata created successfully.",
      data: newBioData,
    });
  } catch (error) {
    console.dir(error);
  }
};

const getBioDataUsers = async (req, res) => {
  try {
    const bioDataUsers = await bioDataDetails.find().populate({
      path: "template",
      select: "name price -_id"
    });
    ;
    return res.status(200).json({
      success: true,
      message: "BioData users fetched successfully!",
      data: bioDataUsers,
    });
  } catch (error) {
    console.dir(error, { depth: null });

    return res.status(500).json({
      success: false,
      message: "Failed to add BioData",
      error: error?.message || JSON.stringify(error),
    });
  }
};

export { addBioData, getBioDataUsers };

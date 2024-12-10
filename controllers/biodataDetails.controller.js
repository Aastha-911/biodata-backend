import bioDataDetails from "../models/biodataDetails.model.js";

const addBioData = async (req, res) => {
  try {
    const { name, dob, pob, education, work, contactNo, email, address } =
      req.body;

    const newBioData = new bioDataDetails({
      name,
      dob,
      pob,
      education,
      work,
      contactNo,
      email,
      address,
    });

    await newBioData.save();

    return res.status(201).json({
      success: true,
      message: "BioData added successfully!",
      data: newBioData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add BioData",
      error: error.message,
    });
  }
};

export { addBioData };

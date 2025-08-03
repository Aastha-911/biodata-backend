import bioDataDetails from "../models/biodataDetails.model.js";

const addBioData = async (req, res) => {
  try {
    const { name, dob, pob, education, work, contactNo, email, address } = req.body;
    console.log(req.body)
    const photoUrl = req.file?.path;
    if (!photoUrl) {
      return res.status(400).json({
        success: false,
        message: "Photo is required",
      });
    }

    const newBioData = new bioDataDetails({
      name,
      dob,
      pob,
      education,
      work,
      contactNo,
      email,
      address,
      photo: photoUrl,
    });

    await newBioData.save();

    return res.status(201).json({
      success: true,
      message: "Biodata created successfully.",
      data: newBioData,
    });
  } catch (error) {
    console.dir(error, { depth: null }); // ✅ Full error in logs

    return res.status(500).json({
      success: false,
      message: "Failed to add BioData",
      error: error?.message || JSON.stringify(error), // ✅ Will never be [object Object]
    });
  }
};

const getBioDataUsers = async (req, res) => {
  try {
    const bioDataUsers = await bioDataDetails.find();
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

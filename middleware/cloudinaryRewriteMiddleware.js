// cloudinaryRewriteMiddleware.js
function cloudinaryRewriteMiddleware(req, res, next) {
  const originalJson = res.json;
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

  res.json = function (data) {
    let str = JSON.stringify(data);

    // Regex to match Cloudinary URLs with optional version (v123456789)
    const regex = new RegExp(
      `https://res\\.cloudinary\\.com/${CLOUDINARY_CLOUD_NAME}/image/upload/(v[0-9]+/)?`,
      "g"
    );

    // Replace with your proxy domain without version
    const rewritten = str.replace(
      regex,
      "https://www.marriagebiodataonline.com/images/"
    );

    return originalJson.call(this, JSON.parse(rewritten));
  };

  next();
}

export default cloudinaryRewriteMiddleware;

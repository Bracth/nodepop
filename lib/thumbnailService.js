const { Responder } = require("cote");
const jimp = require("jimp");
const path = require("path");

const responder = new Responder({ name: "Thumbnail-Service" });

responder.on("Create-Thumbnail", async (req, done) => {
  let { imagePath } = req;
  imagePath =
    "../nodepop/public" +
    imagePath.split(".")[1] +
    "." +
    imagePath.split(".")[2];

  const result = await jimp
    .read(imagePath)
    .then((thumbnail) => {
      return thumbnail
        .resize(100, 100) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .writeAsync(
          `..${imagePath.split(".")[2]}_thumbnail.${imagePath.split(".")[3]}`
        ); // save
    })
    .catch((err) => {
      console.error(err);
    });

  done(`..${imagePath.split(".")[2]}_thumbnail.${imagePath.split(".")[3]}`);
});

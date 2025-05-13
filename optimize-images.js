import sharp from "sharp";
import { glob } from "glob";
import path from "path";
import fs from "fs";
import { log } from "console";

// Ensure output directory exists
if (!fs.existsSync("./client/public/optimized-images")) {
  fs.mkdirSync("./client/public/optimized-images", { recursive: true });
  log("Output directory created: ./client/public/optimized-images");
} else {
  log("Output directory already exists: ./client/public/optimized-images");
}

// Update your input pattern to match more file types
const inputDir = "./public/images/**/*.{jpeg,jpg,png}";
const outputDir = "./client/public/optimized-images";

log("Looking for images in: " + inputDir);

// Use Promise-based glob API
glob(inputDir)
  .then(files => {
    console.log("Files found:", files);
    console.log(`Going to optimize ${files.length} files`);

    files.forEach((image) => {
      const filename = path.basename(image, path.extname(image));
      const outputFilePath = path.join(outputDir, `${filename}.webp`);

      sharp(image)
        .resize({
          width: 800,  // Only set width to maintain aspect ratio
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .rotate(90)
        .flip()
        .toFormat("webp", { quality: 80 })
        .toFile(outputFilePath)
        .then(() => {
          console.log(`Successfully optimized ${image} to ${outputFilePath}`);
        })
        .catch((err) => {
          console.error(`Error optimizing ${image}:`, err);
        });
    });
  })
  .catch(error => {
    console.error("Error finding files:", error);
  });

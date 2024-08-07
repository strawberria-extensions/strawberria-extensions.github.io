const authCookie = "_imgbox_session=U0dQUDI3YXIvUE5IdzBZUlRpVEplNlpUZTRaV0gwb2VoOWtaeVJTNGN6VU15M28zazRBWndaK3dCSWxCS0FIdlF3b1I0VVlLSWJIZVdWUmk4U1kycGl0alk0M3dlcHFrVXZ2Ky93Wmc3elN4bVpDRk8zZDEzbGpGZDVUVFQ1aHBpQjN0M0VXbXhNZFRhb2FBSGZsb1k4RXIyZmRoQ05Nbld3WnhFcnpURGs4a2dWdFlFTnhYU29VSU1HaVJmWkE3Y0FuSmlEZkFCZTdqbEFjZlNiSDVOdz09LS1OdFZ1RnpLRnBUWE0yQ2x0Ync1Lzd3PT0%3D--4e89c1cf80a7e5c6e289ba1949403e34cf03f764";
import { imgbox } from 'imgbox-js';
import { globSync } from "glob";

const multiplier = 1;
const jigsaws = [];
const imageFiles = globSync("C:/Backup/Pictures/Jigsaw/Falks/*")
    .filter(filename => !filename.endsWith("json"));

const maxBatch = 1;
const allUploadResults = [];
for(let startIndex = 0; startIndex < imageFiles.length; startIndex += maxBatch) {
    const splitImageFiles = imageFiles.slice(startIndex, startIndex + maxBatch);
    splitImageFiles.forEach(v => console.log(v))
    const uploadResults = await imgbox(splitImageFiles, { auth_cookie: authCookie, content_type: "adult", thumbnail_size: "800r" });
    if(uploadResults.data.failed.length > 0) {
        console.log("========================");
        console.log(JSON.stringify(uploadResults.data.failed))
        console.log("========================");
        continue
    }
    allUploadResults.push(...uploadResults.data.success)
}

for(let index = 0; index < allUploadResults.length; index++) {
    const imageFilename = imageFiles[index];
    const uploadResult = allUploadResults[index];
    const title = imageFilename.split("\\").reverse()[0].split(".")[0].split(" (")[0];
    const numPieces = parseInt(imageFilename.split("(")[1].split(")")[0]);
    jigsaws.push({
        title: title,
        imageURL: uploadResult.original_url,
        thumbnailURL: uploadResult.thumbnail_url,
        targetPieces: numPieces * multiplier,
        settings: {
            rotation: 30,
            ghost: false,
            edge: false
        }
    });
}
console.log(JSON.stringify({ action: "config-update", config: { jigsaws: jigsaws }}));
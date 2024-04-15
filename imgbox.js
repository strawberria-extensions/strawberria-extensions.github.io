const authCookie = "_imgbox_session=TTlQWTBOYVVDMzk3TFczU1lCUU9ndHRKL0FtWnQ4a05zN2hrSmVFcDJjQkdEZm4rT2dCRTVNTGJNU2hXTVJKRmZKWDNvdVNTa0FuRzhoUlJSTmpxaEtZMzY3SXlNeXp0dS9XeitEaXZPMFpIUXRvUE9DSzExVWJpbzFwZE1pc2VWejcwWjhrdDVwTTlmTnZNdG5IYUk5YlRsbmRsWHBIY2w1ZGlzVnMwSkZXRmltSlBtdEFzeGNvUTJjSTdJSEVwVmh4UW5hbDdyN3Q3TCtBdGZHWXZDTG9acnp6akVIRzYvM0ttbndjVE5SMD0tLWRMKys1K3RtMk1vWE1uQXlreVRCSkE9PQ%3D%3D--900cbd65f6dda5699bcc6385ad576f982633e6cb";
import { imgbox } from 'imgbox-js';
import { globSync } from "glob";

const jigsaws = [];
const imageFiles = globSync("C:/Users/Albert/Pictures/Jigsaw/Falks/*")
    .filter(filename => !filename.endsWith("json"));
const uploadResults = await imgbox(imageFiles, { auth_cookie: authCookie, content_type: "adult", thumbnail_size: "800r" });
if(uploadResults.data.failed.length > 0) {
    throw Error(JSON.stringify(uploadResults.data.failed))
}
for(let index = 0; index < uploadResults.data.success.length; index++) {
    const imageFilename = imageFiles[index];
    const uploadResult = uploadResults.data.success[index];
    jigsaws.push({
        title: imageFilename.split("\\").reverse()[0].split(".")[0],
        imageURL: uploadResult.original_url,
        thumbnailURL: uploadResult.thumbnail_url,
        targetPieces: 100,
        settings: {
            rotation: 30,
            ghost: false,
            edge: false
        }
    });
}
console.log(JSON.stringify({ jigsaws: jigsaws }));
const path = require("path");
const fs = require("fs");

// Define the path to the directory
const dirPath = path.join(__dirname, "files");
// console.log(dirPath)
// for(i=1;i<=5;i++){
//     fs.writeFileSync(`${dirPath}/hello${i}.text`,`This is ${i} file`);
// }

// Read the contents of the directory
fs.readdir(dirPath, (err, files) => { 
  if (err) {
    // Handle errors during directory reading
    console.log("Error reading directory", err);
    return;
  }

  // Iterate through each file in the directory
  files.forEach((eachFile) => {

    console.log(eachFile);

    // Construct the full path for each file
    const filePath = path.join(dirPath, eachFile);

    // Read the content of each file
    const content = fs.readFileSync(filePath, "utf-8");

    // Log the content to the console
    console.log(content);
  });
});

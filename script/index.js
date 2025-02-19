import fs from "fs";

const folderPath = "./src/components";

let exportStr = "";
fs.readdirSync(folderPath).forEach((item) => {
  exportStr = `${exportStr}\n export { default as ${item} } from './components/${item}';`;
});

fs.writeFile("./script/test.js", exportStr, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("File has been created");
});

const fs = require("fs");
module.exports = { name: "Souvik" };

console.log(this === exports);
async function abc() {
  const a = fs.readFile("./oma.txt", (err, data) => {
    console.log(data.toString(), "ok");
  });
}
abc();

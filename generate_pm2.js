require("dotenv").config();
const fs = require("fs");

const app = {
    apps: [
        {
            "name"        : "OpenAI Proxy Server",
            "script"      : "./bin/www",
            "merge_logs"  : true,
            "cwd"         : __dirname,
            "out_file"    : process.env.LOG_FILE,
            "error_file"  : process.env.LOG_FILE,
        }
    ]
};

fs.writeFile("pm2_generated.json", JSON.stringify(app, null, 2), "utf8", function (err) {
    if (err) {
        console.error("Error writing file:", err);
    } else {
        console.log("File saved successfully!");
    }
})
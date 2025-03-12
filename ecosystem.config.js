require("dotenv").config();

module.exports = {
    apps: [
        {
            "name"        : "OpenAI Proxy Server",
            "script"      : "./bin/www",
            "merge_logs"  : true,
            "out_file"    : process.env.LOG_FILE,
            "error_file"  : process.env.LOG_FILE,
        }
    ]
};
var express = require('express');
var router = express.Router();
const OpenAI = require("openai");
const debug = require('debug')('openai-proxy:index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  const client = new OpenAI({
    baseURL: req.body.baseURL,
    apiKey: req.body.apiKey,
  });
  const start_time = performance.now();
  client.chat.completions.create(JSON.parse(req.body.data))
      .then(function(data) {
        const answer = [];
        const streamHandler = async () => {
          for await (const chunk of data) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const time = (performance.now() - start_time)/1000
              debug(`[${time.toFixed(3)}s] ${content}]`)
              answer.push(content); // Send each chunk
            }
          }
          res.send(JSON.stringify({
            error: 0,
            content: answer.join(''),
          }));
          res.end(); // Close connection when done
        };

        void streamHandler();
      })
      .catch(err => {
        res.send(JSON.stringify({
          error: 1,
          error_msg: err,
        }));
      });
});

module.exports = router;

const express = require('express');
const app = express.Router();
const chalk = require('chalk');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const WOLFRAM_APPID = process.env.WOLFRAM_APPID; 
const WOLFRAM_ENDPOINT = (question) => `http://api.wolframalpha.com/v1/result?appid=${WOLFRAM_APPID}&i=${question}`;

const queryApi = async (question) => {
  return fetch(WOLFRAM_ENDPOINT(question))
  .then(res => res.text())
  .then(body => body);
} 

const cache = {}
const cacheMiddleWare = (req, res, next) => {
    const key = req.url
    if (cache[key]) {
        res.send(cache[key])
    } else {
        res.sendResponse = res.send
        res.send = (body) => {
            cache[key] = body
            res.sendResponse(body)
        }
        next();
    }
}

const asyncMiddleware = fn =>
(req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};
 
app.get('/', cacheMiddleWare, asyncMiddleware(async (req, res) => {
  let response = "";

  const question = (req.query.q || "").toLowerCase();
  if (question !== "" && question.indexOf(':') > -1) {
    // Assumed that question follows "QUESTIONID: question string" syntax
    const questionString = question.substr(question.indexOf(':') + 1).trim();
    console.log(chalk.blue('Question: ' + questionString));
    
    response = await queryApi(questionString);
    if (response.indexOf(',') > -1) {
      response = response.substr(0, response.indexOf(','));
    }
    response = response.toLowerCase();
    
    if (response === 'no short answer available' || response === 'wolfram|alpha did not understand your input') {
      response = "";
      
      // MANUAL REPLIES HERE:
      switch (questionString) {
        case 'what colour is a banana?':
          response = 'yellow';
          break;
          
        default:
          console.log(chalk.white.bgRed('MISSING ANSWER FOR THIS QUESTION:'));
          console.log(chalk.white(questionString));
          break;
      }
    }
    console.log(chalk.yellow('Answer: ' + response));
  }
  
  res.send(response);
}));

module.exports = app;
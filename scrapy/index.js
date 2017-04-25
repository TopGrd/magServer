const sanitizeHtml = require('sanitize-html')
const async = require('async')
const queue = require('../config/task').queue
const domConfig = require('../config/dom')
const fetch = require('./worker')

const start = queue => {
  return new Promise((resolve, reject) => {
    async.map(
      queue,
      (url, callback) => {
        fetch(url, posts => {
          const articles = posts.map(item => ({
            title: item.title,
            author: item.author,
            categories: item.categories,
            summary: sanitizeHtml(item.summary, domConfig),
            content: sanitizeHtml(item.description, domConfig)
          }))
          callback(null, {
            url,
            articles
          })
        })
      },
      (err, results) => {
        if (err) {
          reject(err)
        }

        resolve(results)
      }
    )
  })
}

module.exports = {
  start
}

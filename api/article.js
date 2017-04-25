const crawler = require('../scrapy')
const queue = require('../config/task').queue

module.exports = {
  'GET /api/articles': async (ctx, next) => {
    let articles = await crawler.start(queue)
    ctx.state = articles
  }
}

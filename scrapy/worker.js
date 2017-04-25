const request = require('request')
const FeedParser = require('feedparser')

const fetch = (url, callback) => {
  console.log(url)
  const feedparser = new FeedParser()
  const req = request(url)
  const posts = []

  req.on('error', error => log.error(error))

  req.on('response', res => {
    const stream = req

    if (res.statusCode !== 200) {
      this.emit('error', new Error('Bad status code'))
    } else {
      stream.pipe(feedparser)
    }
  })

  feedparser.on('error', error => log.error(error))

  feedparser.on('readable', () => {
    const stream = feedparser
    let item
    // eslint-disable-next-line
    while ((item = stream.read())) {
      console.log('Got article', item.title)
      posts.push(item)
    }
  })

  feedparser.on('end', () => {
    console.log(`Fetched: ${url}`)
    callback(posts)
  })
}

module.exports = fetch

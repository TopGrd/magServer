module.exports = {
  'GET /api/jack': async (ctx, next) => {
    ctx.body = {
      data: 'jack'
    }
  }
}

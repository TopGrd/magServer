const resApi = (ctx) => {
  console.log(ctx.state)
  if (ctx.state) {
    ctx.body = {
      code: 200,
      message: 'success',
      data: ctx.state
    }
  } else {
    ctx.body = {
      code: 200,
      message: 'success'
    }
  }
}

const urlFilter = (pattern) => {
  return async (ctx, next) => {
    const reg = new RegExp(pattern)
    await next()
    if (reg.test(ctx.originalUrl)) {
      resApi(ctx)
    }
  }
}

module.exports = urlFilter

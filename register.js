const _ = require('lodash')
const fs = require('fs')

const mapControllers = (router, dir) => {
  let controllers = fs.readdirSync(`${__dirname}/${dir}`).filter(file => {
    return file.endsWith('.js')
  })
  controllers.forEach(f => {
    console.log(`[INFO] process controller ${f}`)
    let controller = require(`${__dirname}/${dir}/${f}`)
    addController(router, controller)
  })
}

const addController = (router, controller) => {
  Object.keys(controller).forEach(url => {
    let uri = _.trim(url)
    let [method, path] = uri.split(' ')
    const restMap = {
      'GET': 'get',
      'POST': 'post',
      'PUT': 'put',
      'DELETE': 'del'
    }

    if (!Object.keys(restMap).includes(method)) {
      console.log(`[ERROR] ${method} is not a restful method`)
      return
    }

    router[restMap[method]](path, controller[url])
    console.log(`[INFO] register controller ${method}: ${path}.`)
  })
}

module.exports = dir => {
  let controllerDir = dir ? dir : 'api'
  let router = require('koa-router')()
  mapControllers(router, controllerDir)
  return router.routes()
}

const koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const app = new koa()
const fs = require('fs')
const mockFiles = fs.readdirSync(`${__dirname}/src/mock`)

let allRouterObj = {}
for (const jsFilesName of mockFiles) {
let item = require(`${__dirname}/src/mock/${jsFilesName}`)
    allRouterObj = {...allRouterObj, ...item}
}

let allRouterMode = Object.keys(allRouterObj)
allRouterMode.forEach(element => {
    let [mode, apiPath] = element.split(' ')
    mode = mode.toLowerCase()
    let routerBody = allRouterObj[element]
    if (typeof routerBody === 'function') {
        router[mode](apiPath, async (ctx, next) => {
            let {request, response} = ctx
            await routerBody(request, response)
            next()
        })
    } else {
        router[mode](apiPath, async (ctx, next) => {
            ctx.body = routerBody
            next()
        })
    }
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)
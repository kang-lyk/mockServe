const Mock = require('mockjs')

module.exports = {
    'POST /api/login': Mock.mock({
        userName: '@cfirst'
    }),
    'GET /api/user': async (request, response) => {
        response.set({
            'Access-Control-Allow-Origin': '*',
            'eelly': '123445'
        })
        response.body = Mock.mock({
            userName: '@cfirst',
            age: 34
        })
    }
} 

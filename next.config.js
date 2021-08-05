const path = require('path')

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
        baseURL: "http://api.uku.kg/api/v1"
    }
}
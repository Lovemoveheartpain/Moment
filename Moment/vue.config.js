module.exports = {
    devServer: {
        proxy: {
            '/api': {              
                target: 'https://test.365msmk.com',         // 服务器端接口地址
                // target: 'https://www.365msmk.com',         // 服务器端接口地址
                // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
}
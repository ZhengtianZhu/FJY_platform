import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    if (command === "serve") {
        return {
            plugins: [vue()],
            resolve: {
              alias: {
                '@': resolve(__dirname, 'src'),
              }
            },  
            server: {
              port: 8881,
              host: "localhost",
              open: false,
              proxy: {
                  '/dev-api': {
                      target: 'http://10.82.8.103:8080',
                      changeOrigin: true,
                      rewrite: (p) => p.replace(/^\/dev-api/, '')
                  },
                  '/device_api': {
                      target: 'http://8.142.81.91:3000',
                      secure: false,
                      changeOrigin: true,
                      rewrite: (path) => path.replace(/^\/device_api/, '')
                  },
                  "/testdata": {
                      target: "http://www.xisiot.com:8900",
                      secure: false,
                      changeOrigin: true,
                      rewrite: (path) => path.replace(/^\/testdata/, '')
                  },
                  "/fjy_api": {
                    target: "http://www.xisiot.com:8889",
                    secure: false,
                    changeOrigin: true,
                    rewrite(path) {
                        return path.replace(/^\/fjy_api/, '')
                    },
                  }
              },
          },
        }
    }
    // else if (command === "build") {
    //     return {
    //         plugins: [vue()],
    //         resolve: {
    //           alias: {
    //               '@': resolve(__dirname, 'src'),
    //               // 'examples': resolve(__dirname, 'examples'),
    //               // 'lib': resolve(__dirname, 'lib'),
    //               // 'static': resolve(__dirname, 'static'),
    //               // 'public': resolve(__dirname, 'public'),
    //               // 'config': resolve(__dirname, 'examples/src/config'),
    //           },
    //           // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    //           // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    //         },  
    //         server: {
    //           port: 8881,
    //           host: "localhost",
    //           open: false,
    //           proxy: {
    //               // https://cn.vitejs.dev/config/#server-proxy
    //               '/dev-api': {
    //                   target: 'http://10.82.8.103:8080',
    //                   changeOrigin: true,
    //                   rewrite: (p) => p.replace(/^\/dev-api/, '')
    //               },
    //               "/api": "http://mapserver.agrs.cn:6080/arcgis/services/China10kmPublish/MapServer/WmsServer",
    //               '/device_api': {
    //                   target: 'http://8.142.81.91:3000',
    //                   secure: false,
    //                   changeOrigin: true,
    //                   rewrite: (path) => path.replace(/^\/device_api/, '')
    //               },
    //               "/testdata": {
    //                   target: "http://www.xisiot.com:8900",
    //                   secure: false,
    //                   changeOrigin: true,
    //                   rewrite: (path) => path.replace(/^\/testdata/, '')
    //               }
    //               //"/dew":"http://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/WMTS",
    //               //"/deh":"http://mapserver.agrs.cn:6080/arcgis/rest/services/China10kmPublish/MapServer/WMTS",
    //           },
    //       },
    //     }
    // }
})

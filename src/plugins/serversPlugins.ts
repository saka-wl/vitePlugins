import { join } from "path";
import { Plugin } from "vite";

export default function serversPlugin(): Plugin {
    let serversPluginName = 'plugins:server-index.html'
    return {
        name: serversPluginName,
        transformIndexHtml(html) {
            return {
                html,
                tags: [
                    {
                        tag: 'script',
                        injectTo: "body",
                        attrs: {
                            type: 'module',
                            src: '/@fs/' + join(__dirname, '../src/runtime/entry.ts')
                        }
                    }
                ]
            }
        },
        configureServer(server) {
            // 被调用的后置钩子
            return async () => {
                server.middlewares.use(async (req, res, next) => {
                    // 自定义请求处理...
                    let template = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                        </head>
                        <body>
                            <div id="root"></div>
                        </body>
                        </html>`

                    let content = await server.transformIndexHtml(req.url, template)
                    res.setHeader('Content-Type', 'text/html');
                    res.end(content);
                })

            }
        }
    }
}
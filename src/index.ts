
import { join } from 'path'
import { createServer, normalizePath } from 'vite'
import serversPlugin from "./plugins/serversPlugins"
import myVirtualPlugin from "./plugins/myVirtualPlugin"

async function init() {
    const server = await createServer({
        // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
        configFile: false,
        root: normalizePath(join(__dirname, '..')),
        plugins: [
            serversPlugin(),
            myVirtualPlugin()
        ],
        server: {
            port: 1337,
        },
    })
    await server.listen()

    server.printUrls()
}

init()
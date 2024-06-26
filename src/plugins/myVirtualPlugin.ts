

export default function myPlugin() {
    const virtualModuleId = 'virtual:my-module'

    return {
        name: 'my-plugin', // 必须的，将会在 warning 和 error 中显示
        resolveId(id) {
            if (id === virtualModuleId) {
                return '\0' + virtualModuleId
            }
        },
        load(id) {
            if (id === '\0' + virtualModuleId) {
                return `export const msg = "from virtual module"`
            }
        },
    }
}
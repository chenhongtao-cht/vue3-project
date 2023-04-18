const isDev = process.env.NODE_ENV === 'development';

const config = {
    // 这个是一个配置示例
    // 全局的配置，比如wms的前缀等
    wmsPre: isDev ? '/devPre' : '/prodPre'
}

export default new Proxy(config, {
    get(target, key) {
        if (typeof target[key] === 'undefined') {
            console.error(key, '在src/global/config.js中未定义');
        }
        return target[key];
    }
})
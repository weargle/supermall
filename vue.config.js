module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  /*css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            viewportWidth: 375,//视窗的宽度,对应的是我们设计稿的宽度
            viewportHeight: 667,//视窗的长度,对应的是我们设计稿的长度
            unitPrecision: 5,//指定'px'转换为视窗单位值的小数位数(很多时候无法整除)
            viewportUnit: 'vw',//指定需要转换的视窗单位,建议使用vw
            selectorBlackList: ['ignore', 'tab-bar'],//指定不需要转换的类
            minPixelValue: 1,//小于或等于'1px'不转换为视窗,
            mediaQuery: false, //允许在媒体查询中转换'px',
            exclude: [/TabBar\.$vue/]
          })
        ]
      }
    }
  }*/
}

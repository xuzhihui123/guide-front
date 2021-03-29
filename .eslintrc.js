module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: 0,
    // 组件/实例的选项的顺序
    // 'vue/order-in-components': [
    //   'error',
    //   {
    //     order: [
    //       'el',
    //       'name',
    //       'parent',
    //       'functional',
    //       ['delimiters', 'comments'],
    //       ['components', 'directives', 'filters'],
    //       'extends',
    //       'mixins',
    //       'inheritAttrs',
    //       'model',
    //       ['props', 'propsData'],
    //       'data',
    //       'computed',
    //       'watch',
    //       'LIFECYCLE_HOOKS',
    //       'methods',
    //       ['template', 'render'],
    //       'renderError'
    //     ]
    //   }
    // ]
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}

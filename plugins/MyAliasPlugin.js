export default () => ({
  name: 'my-alias-plugin',
  config: (config, {mode, command}) => {
    console.log('自定义alias插件', config)
    return {
      
    }
  }
})
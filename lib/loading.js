import { createApp, h } from 'vue'
var _default = createApp({
  functional: true,//无状态 (没有响应式数据)
  props: {},
  data: function data() {
    return {}
  },
  setup() {
    return h('div', {
      'class': 'loading',
      'style': {
        position: 'fixed',
        top: '0',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#fff',
        zIndex: "9999"
      }
    }
  }
})
var queue = []; //创建loading数组个数
function createInstance() {
  queue = queue.filter(function (item) {
    return !item.$el.parentNode || document.body.contains(item.$el);
  });
  if (!queue.length) {
    var loading = _default
    document.body.appendChild(loading.$el) //在body子级添加
    queue.push(loading);
  }
  console.log(queue, 'queue')
  return queue[queue.length - 1];
}
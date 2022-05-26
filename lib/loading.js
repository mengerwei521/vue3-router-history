import { createApp, h, Teleport } from 'vue'

var queue = []; //创建loading数组个数
var loading = '';

let cereate = function () {
  var app = createApp({
    props: {},
    data: function data() {
      return {}
    },
    setup: function setup() {
      return () => {
        return h(Teleport, {
          "to": 'body'
        }, h('div', {
          id: 'aaa',
          'class': 'loading',
          'style': {
            position: 'fixed',
            top: '0',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            background: '#fff',
            zIndex: "99999"
          },

        }))
      }
    }
  })
  var root = document.createElement('div');
  document.body.appendChild(root);//在body子级添加
  return {
    instance: app.mount(root),
    unmount: function () {
      app.unmount(root);
      document.body.removeChild(root);
    }
  }
}
function createInstance() {

  queue = queue.filter(function (item) {
    return item !== loading
  });
  if (!queue.length) {

    var found = cereate();
    loading = found.instance;
    loading.clear = function () {
      found.unmount()
    }
    queue.push(loading);
  }
  return queue[queue.length - 1];
}
function Loading() {
  return createInstance();
}
Loading.clear = function () {
  queue[0].clear();
  queue = []
};
export default Loading;
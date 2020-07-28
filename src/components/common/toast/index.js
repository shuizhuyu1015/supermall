import Toast from './Toast';

const obj = {};

obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  // 2.new的方式通过组件构造器，创建一个组件对象
  const toast = new toastConstructor();

  // 3.将组建对象手动挂载到某一元素上
  toast.$mount(document.createElement('div'));

  // 4.toast.$el对应的就是上面创建的div，添加到body
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
}

export default obj;

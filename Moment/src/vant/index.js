// 导入自己需要的组件
import { Button, Tabbar, TabbarItem, Icon, Swipe, SwipeItem, Lazyload,Toast } from 'vant'
const vant = {
    install: function (Vue) {
        Vue.
            use(Button).
            use(Tabbar).
            use(TabbarItem).
            use(Icon).
            use(SwipeItem).
            use(Swipe).
            use(Lazyload).
            use(Toast)
    }
}
export default vant
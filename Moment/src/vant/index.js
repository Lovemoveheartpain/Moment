// 导入自己需要的组件
import { Button, Tabbar, TabbarItem, Icon, Swipe, SwipeItem, Lazyload, Toast, Overlay, Search, List, Tab, Tabs } from 'vant'
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
            use(Toast).
            use(Overlay).
            use(Search).
            use(List).
            use(Tab).
            use(Tabs)
    }
}
export default vant
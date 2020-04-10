// 导入自己需要的组件
import {
    Button,
    Tabbar,
    TabbarItem,
    Icon,
    Swipe,
    SwipeItem,
    Lazyload,
    Toast,
    Overlay,
    Search,
    List,
    Tab,
    Dialog,
    Tabs,
    Calendar,
    DropdownMenu,
    DropdownItem,
    ActionSheet,
    Field,
    Uploader,
    Popup,
    DatetimePicker,
    Area,
    Checkbox,
    CheckboxGroup,
} from 'vant'
const vant = {
    install: function (Vue) {
        Vue
            .use(Button)
            .use(Tabbar)
            .use(TabbarItem)
            .use(Icon)
            .use(SwipeItem)
            .use(Swipe)
            .use(Lazyload)
            .use(Toast)
            .use(Overlay)
            .use(Search)
            .use(List)
            .use(Tab)
            .use(Tabs)
            .use(Calendar)
            .use(DropdownMenu)
            .use(DropdownItem)
            .use(ActionSheet)
            .use(Field)
            .use(Dialog)
            .use(Uploader)
            .use(Popup)
            .use(DatetimePicker)
            .use(Area)
            .use(Checkbox)
            .use(CheckboxGroup)
    }
}
export default vant
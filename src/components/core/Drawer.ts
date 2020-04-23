import { Component, Vue } from 'vue-property-decorator';

@Component({
    props: {
        expandOnHover: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        "$vuetify.breakpoint.smAndDown"(val) {
            this.$emit("update:expandOnHover", !val);
        }
    }
})
export default class Drawer extends Vue {
    items = [
        { title: 'Welcome', icon: 'home', to: '/' },
        // { title: 'New Poll', icon: 'post_add', to: '/create-poll' },
        // { title: 'Search Poll', icon: 'search', to: '/search-poll' },
    ];

    get drawer(): string {
        return this.$store.state.drawer;
    }
    set drawer(val) {
        this.$store.commit("SET_DRAWER", val);
    }

    get computedItems() {
        return this.items.map(this.mapItem)
    }

    mapItem(item : any) {
        return {
            ...item,
            title: item.title,
            children: item.children ? item.children.map(this.mapItem) : undefined,
        }
    }
}
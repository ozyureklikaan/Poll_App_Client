<template>
	<v-app-bar 
        app color="grey darken-4" 
        flat 
        height="75" 
        style="width: auto;" 
        class="d-print-none"
    >
		<v-btn
			fab
			small
			@click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
		>
			<v-icon v-if="value">mdi-menu</v-icon>
			<v-icon v-else>mdi-menu-open</v-icon>
		</v-btn>

		<v-divider class="mx-4" inset vertical></v-divider>

		<v-toolbar-title class="hidden- white--text" v-text="$route.name" />

		<v-spacer />
	</v-app-bar>
</template>

<script>
    import { Component, Vue } from 'vue-property-decorator';
    import { VHover, VListItem } from 'vuetify/lib';
    import { mapState, mapMutations } from "vuex";

    const $t = Vue.t;

    @Component({
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        computed: {
			...mapState(["drawer"])
        },
        methods: {
			...mapMutations({
				setDrawer: "SET_DRAWER"
			})
		}
    })

    export default class AppBar extends Vue {
        expandOnHover = false;

        created() {
        }
        
        setExpandOnHover() {
			this.$emit("update:expandOnHover", false);
		}
    }
</script>
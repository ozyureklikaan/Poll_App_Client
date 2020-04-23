<template>
  	<v-app>
    	<!-- <base-loading /> -->
		<!-- <core-app-bar v-model="expandOnHover" /> -->
		<core-drawer :expand-on-hover="false" />
		<core-view />
  	</v-app>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import { mapMutations, mapGetters } from "vuex";

	@Component({
		components: {
			// CoreAppBar: () => import("@/components/core/AppBar.vue"),
			CoreDrawer: () => import("@/components/core/Drawer.vue"),
			CoreView: () => import("@/components/core/View.vue")
		}
	})
	export default class App extends Vue {
		expandOnHover = false;

		created() {}
		mounted() {}
	}
</script>

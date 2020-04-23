<template>
	<v-content class="background" fixed>
		<router-view />
		<!-- <core-footer /> -->
	</v-content>
</template>

<script>
	export default {
		name: "CoreView",

		components: {}
	};
</script>

<style>
	.background {
		background: url("../../assets/forest.jpg");
		background-size: cover;
		transform: scale(1);
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
<template>
	<div class="text-center">
		<v-overlay :value="GET_LOADING">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		computed: {
			...mapGetters(["GET_LOADING"])
		}
	};
</script>
<template>
	<v-menu
		offset-y
		v-model="isShowMenu"
		:nudge-right="40"
		min-width="290px"
		:close-on-content-click="false"
		transition="scale-transition"
	>
		<template v-slot:activator="{ on }">
			<v-btn tile small icon color="teal" @click="isShowMenu=!isShowMenu">
				<v-icon>event</v-icon>
			</v-btn>
			<v-text-field
				dense
				outlined
				clearable
				v-model="dateValue"
				@input="input"
				@blur="blur"
				:label="dateLabel"
			></v-text-field>
		</template>
		<v-date-picker v-model="dateValue" @input="isShowMenu=false"></v-date-picker>
	</v-menu>
</template>

<script>
	export default {
		name: "DatePicker",
		props: {
			value: {
				type: String,
				required: true,
				default: ""
			},
			label: {
				type: String,
				require: true
			}
		},
		data: () => {
			return {
				isShowMenu: false,
				dateValue: ""
			};
		},

		computed: {
			dateLabel: {
				get: function() {
					return this.label;
				}
			}
			// dateValue: {
			// 	get: function() {
			// 		return this.value;
			// 	},
			// 	set: function(val) {
			// 		this.$emit("input", val);
			// 	}
			// }
		},
		created() {
			this.dateValue = this.value;
		},
		watch: {
			dateValue: function(val) {
				if (val && val.length === 10) this.$emit("input", val);
			}
		}
	};
</script>
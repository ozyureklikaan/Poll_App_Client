<template>
    <v-navigation-drawer
        class="d-print-none"
		id="core-navigation-drawer"
		v-model="drawer"
		:color="'grey darken-4'"
		:mini-variant="true"
		:expand-on-hover="expandOnHover"
		mobile-break-point="960"
		app
		width="260"
		v-bind="$attrs"
		dark
    >
        <v-list expand nav>
			<template v-for="(item, i) in computedItems">
				<base-item-group v-if="item.children" :key="`group-${i}`" :item="item">
					<!--  -->
				</base-item-group>

				<base-item v-else :key="`item-${i}`" :item="item" />
			</template>
		</v-list>
    </v-navigation-drawer>
</template>

<script src="./Drawer.ts"></script>
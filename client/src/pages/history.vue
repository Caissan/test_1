<template>
	<layout-default>
		<div class="page-history flex-column">
			<ui-button @click="$router.push({path: '/'})">на главную</ui-button>
			<ui-table
				:columns="historyColumns"
				:data="historyList"
			/>
		</div>
	</layout-default>
</template>

<script>
	import { computed } from "vue";
	import { useStore } from "vuex";
	import { useRoute } from "vue-router";
	import LayoutDefault from "~/layouts/default.vue";
	import UiButton from "~/components/ui/button.vue";
	import UiTable from "~/components/ui/table.vue";

	export default {
		name: "PageHistory",
		components: {
			UiTable,
			UiButton,
			LayoutDefault
		},
		setup() {
			const store = useStore();
			const route = useRoute();

			const historyColumns = {
				id: "ID",
				name: "Name",
				action: "Action",
				date: "Date"
			};

			const historyList = computed(() => {
				if (route.query.type) return store.state.user.history.filter(item => item.type === route.query.type);
				return store.state.user.history;
			});

			return {
				historyColumns,
				historyList
			};
		}
	};
</script>

<style lang="scss" scoped>
	@import "~/assets/styles/variables";

	.page-history {
		padding: $size-18 0;
	}
</style>
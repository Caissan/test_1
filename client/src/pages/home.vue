<template>
	<layout-default>
		<div class="page-home">
			<div class="flex-column">
				<ui-input
					v-model="search"
					placeholder="поиск"
				/>
				<div class="flex-row">
					<ui-button @click="sort('asc')">по возрастанию</ui-button>
					<ui-button @click="sort('desc')">по убыванию</ui-button>
					<ui-button @click="sort()">сброс</ui-button>
				</div>
			</div>
			<div class="flex-row right">
				<ui-button @click="$router.push({path: 'history'})">история</ui-button>
				<ui-button @click="$router.push({path: 'history', query: { type: 'added' }})">
					история добавлений
				</ui-button>
				<ui-button @click="$router.push({path: 'history', query: { type: 'removed' }})">
					история удалений
				</ui-button>
			</div>
			<ui-table
				:columns="usersColumns"
				:data="usersList"
				@click="onListClick"
			>
				<template #action="data">
					<ui-button :data-id="data.row.id">add to favorites</ui-button>
				</template>
			</ui-table>
			<ui-table
				:columns="usersColumns"
				:data="favoriteList"
				@click="onFavoriteClick"
			>
				<template #action="data">
					<ui-button :data-id="data.row.id">remove</ui-button>
				</template>
			</ui-table>
		</div>
	</layout-default>
</template>

<script>
	import { computed } from "vue";
	import { useStore } from "vuex";
	import LayoutDefault from "~/layouts/default.vue";
	import UiButton from "~/components/ui/button.vue";
	import UiInput from "~/components/ui/input.vue";
	import UiTable from "~/components/ui/table.vue";

	export default {
		name: "PageHome",
		components: {
			UiTable,
			UiInput,
			UiButton,
			LayoutDefault
		},
		setup() {
			const store = useStore();

			const usersColumns = {
				id: "ID",
				name: "Name",
				action: "Action"
			};

			const usersList = computed(() => store.getters["user/USERS"]);
			const favoriteList = computed(() => store.getters["user/FAVORITES"]);

			const search = computed({
				get() {
					return store.state.user.search;
				},
				set(value) {
					store.dispatch("user/SET_SEARCH", value);
				}
			});

			const onListClick = (event) => {
				const id = event.target.getAttribute("data-id");
				if (!id) return;
				store.dispatch("user/ADD_TO_FAVORITE", id * 1);
			};

			const onFavoriteClick = (event) => {
				const id = event.target.getAttribute("data-id");
				if (!id) return;

				store.dispatch("user/REMOVE_FROM_FAVORITE", id * 1);
			};

			const sort = (destination) => {
				store.commit("user/SORT_DESTINATION", destination);
			};

			return {
				usersColumns,
				usersList,
				favoriteList,
				search,
				onListClick,
				onFavoriteClick,
				sort
			};
		}
	};
</script>

<style lang="scss" scoped>
	@import "~/assets/styles/variables";

	.page-home {
		display: grid;
		grid-template-rows: 100px 1fr;
		grid-template-columns: repeat(2, 1fr);
		gap: $size-18;
		width: 100%;
		min-height: inherit;
		max-height: 100%;
		padding: $size-18 0;
	}
</style>
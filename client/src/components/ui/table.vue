<template>
	<div
		class="ui-table"
		ref="tableContainer"
		@scroll="onScroll"
	>
		<table ref="tableElement">
			<tr>
				<th
					v-for="(item, index) in columnsKeys"
					:key="index"
				>
					{{ columns[item] }}
				</th>
			</tr>
			<tr
				v-for="(row, rowIndex) in computedData"
				:key="rowIndex"
			>
				<td
					v-for="(item, itemIndex) in columnsKeys"
					:key="itemIndex"
				>
					<slot :name="item" :row="row">{{ row[item] }}</slot>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
	import { computed, ref, watch } from "vue";

	const distanceScrollTrigger = 100;
	const linesNumber = 50;

	export default {
		name: "UiTable",
		props: {
			columns: {
				type: Object,
				default: () => {
				}
			},
			data: {
				type: Array,
				default: () => []
			},
		},
		setup(props) {
			const offset = ref(0);
			const tableContainer = ref(null);
			const tableElement = ref(null);
			const columnsKeys = computed(() => Object.keys(props.columns));

			const computedData = computed(() => {
				return props.data.slice(0, linesNumber + offset.value);
			});

			const onScroll = () => {
				const bottomLimit = tableElement.value.offsetHeight
					- tableContainer.value.offsetHeight
					- distanceScrollTrigger;

				if (tableContainer.value.scrollTop > bottomLimit) {
					offset.value += linesNumber;
				}
			};

			return {
				tableContainer,
				tableElement,
				columnsKeys,
				computedData,
				onScroll
			};
		}
	};
</script>

<style lang="scss" scoped>
	@import "~/assets/styles/variables";

	.ui-table {
		width: 100%;
		overflow: auto;
		max-height: 100%;

		table {
			width: 100%;
			border-collapse: collapse;
			//border: 1px solid red;

			tr:not(:last-child) {
				border-bottom: 1px solid color-grey(90);
			}

			th {
				font-weight: bold;
				text-align: left;
			}
		}
	}
</style>
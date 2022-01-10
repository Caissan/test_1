<template>
	<div class="ui-input flex-row middle">
		<input
			type="text"
			:value="modelValue"
			:placeholder="placeholder"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
	</div>
</template>

<script>
	export default {
		name: "UiInput",
		props: {
			modelValue: {
				type: [String, Number],
				default: ""
			},
			placeholder: {
				type: [String, Number],
				default: ""
			}
		},
		emits: ["update:modelValue"]
	};
</script>

<style lang="scss" scoped>
	@import "~/assets/styles/variables";

	.ui-input {
		border: 1px solid color-grey(80);
		border-radius: $size-4;
		background-color: $color-white;
		width: 100%;
		height: 30px;
		overflow: hidden;

		& > input {
			background-color: transparent;
			color: inherit;
			font-size: inherit;
			border: none;
			outline: none;
			width: 100%;
			height: 100%;
			line-height: inherit;
		}
	}
</style>
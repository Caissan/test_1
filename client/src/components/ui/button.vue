<template>
	<button
		class="ui-button flex-row middle"
		@click="$emit('click')"
	>
		<slot />
	</button>
</template>

<script>
	export default {
		name: "UiButton",
		emits: ["click"],
	};
</script>

<style lang="scss" scoped>
	@import "~/assets/styles/variables";

	.ui-button {
		border: none;
		outline: none;
		cursor: pointer;
		padding: 0 $size-12;
		background-color: color-blue(40);
		color: $color-white;
		width: fit-content;
		height: $size-32;
		border-radius: $size-4;
		transition: all 70ms ease-in-out;
		user-select: none;

		&:hover {
			background-color: color-blue(45);
		}

		&:active {
			transform: scale(0.97);
		}
	}
</style>
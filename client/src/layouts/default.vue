<template>
	<div class="layout-default">
		<div class="layout-default__content">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import "~/assets/styles/variables";

	.layout-default {
		display: flex;
		flex-direction: row;
		justify-content: center;
		min-height: inherit;
		background-color: color-blue(98);

		&__content {
			width: 960px;
			min-height: inherit;
			max-height: 100vh;
		}
	}
</style>
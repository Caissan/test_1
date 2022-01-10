<template>
	<RouterView />
</template>

<script>
	import { useStore } from "vuex";

	export default {
		setup() {
			const store = useStore();
			store.dispatch("user/INIT");
		}
	};
</script>

<style>
	@import "assets/styles/reset.scss";
	@import "assets/styles/common.scss";

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		width: 100%;
		min-height: inherit;
	}
</style>

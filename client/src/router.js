import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		component: () => import("./pages/home.vue"),
	}, {
		path: "/history",
		component: () => import("./pages/history.vue"),
	},
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
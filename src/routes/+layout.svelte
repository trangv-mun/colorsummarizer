<script lang="ts">
	import { themeChange } from 'theme-change';
	import { onMount } from 'svelte';

	import '../app.css';
	import Header from '../components/Header.svelte';

	onMount(() => themeChange(false));
</script>

<Header />

<div class="p-6">
	<slot />
</div>

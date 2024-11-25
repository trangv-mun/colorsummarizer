<script lang="ts">
	const precisions = [
		{
			value: 50,
			text: 'vlow'
		},
		{
			value: 75,
			text: 'low'
		},
		{
			value: 100,
			text: 'medium'
		},
		{
			value: 150,
			text: 'high'
		},
		{
			value: 200,
			text: 'vhigh'
		}
	];

	let isLoading: boolean = false;
</script>

<svelte:head><title>Color Summarizer</title></svelte:head>

<form
	class="max-w-3xl mx-auto border border-secondary p-8 rounded-xl mt-20"
	method="POST"
	enctype="multipart/form-data"
	on:submit={() => (isLoading = true)}
>
	<h2 class="text-2xl mb-8 text-center font-bold">Start analyzing your artwork</h2>
	<p class="font-semibold">File</p>
	<input
		type="file"
		accept="image/*"
		name="photo"
		class="file-input file-input-bordered w-full mb-4"
	/>

	<p class="font-semibold">Number of color clusters</p>
	<!-- <select class="select select-bordered w-full mb-4" name="clusters">
		<option disabled selected>Select number of color clusters to include</option>
		{#each [2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20] as value}
			<option>{value}</option>
		{/each}
	</select> -->
	<input
		class="input input-bordered w-full mb-4"
		placeholder="Set a value between 2-20"
		type="number"
		min={2}
		max={20}
		name="clusters"
	/>
	<p class="font-semibold">Precision</p>
	<select class="select select-bordered w-full mb-4" name="precision">
		{#each precisions as precision}
			<option value={precision.text}>{`${precision.text} (${precision.value}px)`}</option>
		{/each}
	</select>
	<button class="btn btn-primary" type="submit" disabled={isLoading}>Start processing</button>
</form>

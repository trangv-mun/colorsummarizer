<script lang="ts">
	// import { pixels, clusters, file, histogram } from '../../results2.json';
	import Historgram from '../../components/Historgram.svelte';
	import { mapColors } from '../../lib/utils';
	import type { PageData } from '../$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	const h = data.file.w;
	const w = Math.ceil((data.file.w / data.file.h0) * data.file.w0);

	let currentCluster: string | null = null;

	let clientImage: HTMLImageElement;
	let canvasContainer: HTMLDivElement;
	let isLoading: boolean = true;
	let colorModel: string = 'hex';

	$: if (clientImage && canvasContainer) {
		prepareCanvas();
	}

	const prepareCanvas = () => {
		const canvas: CanvasRenderingContext2D[] = [];
		const origCanvas: CanvasRenderingContext2D[] = [];
		const origImageDatas: ImageData[] = [];
		const imageDatas: ImageData[] = [];

		Object.keys(data.clusters).map((index) => {
			const origId = `orig-canvas-${index}`;
			const origCtx = (document.getElementById(origId) as HTMLCanvasElement).getContext('2d');
			const origImageData = origCtx?.createImageData(w, h);
			origCtx && origCanvas.push(origCtx);
			origImageData && origImageDatas.push(origImageData);

			const id = `canvas-${index}`;
			const ctx = (document.getElementById(id) as HTMLCanvasElement).getContext('2d');
			const imageData = ctx?.createImageData(clientImage.clientWidth, clientImage.clientHeight);
			ctx && canvas.push(ctx);
			imageData && imageDatas.push(imageData);
		});

		mapColors(
			origCanvas,
			origImageDatas,
			canvas,
			imageDatas,
			w,
			clientImage.clientWidth,
			clientImage.clientHeight,
			data.pixels
		);
	};

	onMount(() => {
		setTimeout(() => (isLoading = false), 1500);
	});
</script>

<svlete:head><title>Color Summarizer - Report</title></svlete:head>

{#if isLoading}
	<div
		class="fixed w-screen h-screen top-0 left-0 bg-white z-50 flex justify-center items-center flex-col"
	>
		<span class="loading loading-infinity w-48 text-accent"></span>
		<h4 class="text-3xl text-primary">Analyzing your image</h4>
	</div>
{/if}
<h3 class="font-semibold text-lg mb-3">Color Clusters</h3>
<div role="alert" class="alert alert-success text-sm py-2 mb-4 text-white">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		class="h-6 w-6 shrink-0 stroke-current"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		></path>
	</svg>
	<span>Hover over the table row to see the color cluster position in your image.</span>
</div>
<div class="flex gap-5 items-center">
	<div>
		<div class="relative">
			<img
				class:grayscale={currentCluster}
				class:opacity-50={currentCluster}
				src={data.image_url}
				width="300"
				alt="client"
				bind:this={clientImage}
			/>

			{#if isLoading}Loading....{/if}

			{#if clientImage && !!clientImage.clientWidth && !!clientImage.clientHeight}
				<div
					bind:this={canvasContainer}
					class="[&>canvas]:absolute [&>canvas]:top-0 [&>canvas]:left-0"
				>
					{#each Object.keys(data.clusters) as cluster}
						<canvas
							width={clientImage.clientWidth}
							height={clientImage.clientHeight}
							id={`canvas-${cluster}`}
							class="disable-blur"
							class:opacity-0={cluster !== currentCluster}
							class:opacity-100={cluster == currentCluster}
						></canvas>
						<canvas width={w} height={h} id={`orig-canvas-${cluster}`} class="hidden"></canvas>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text font-bold">Color Model</span>
			</div>
			<select class="select select-sm select-bordered w-full max-w-xs" bind:value={colorModel}>
				<option disabled>Select color model</option>
				<option value="rgb">RGB</option>
				<option value="hex">HEX</option>
				<option value="lch">LCH</option>
				<option value="cmyk">CMYK</option>
				<option value="xyz">XYZ</option>
			</select>
		</label>

		<div class="overflow-x-auto">
			<table
				class="table"
				on:mouseout={() => (currentCluster = null)}
				on:blur={() => (currentCluster = null)}
			>
				<thead>
					<tr>
						<th>Cluster</th>
						<th style="width:180px;">Color </th>
						<th>Name</th>
						<th>Distribution</th>
						<th>Tags</th>
					</tr>
				</thead>
				<tbody>
					{#each Object.entries(data.clusters) as [index, cluster]}
						<tr
							class="hover:bg-accent hover:bg-opacity-50"
							on:mouseover={() => (currentCluster = index)}
							on:focus={() => (currentCluster = index)}
						>
							<th
								><div
									role="presentation"
									style={`background-color: ${cluster['hex'][0]};`}
									class="w-16 h-16 border-4"
								></div></th
							>
							<th
								>{colorModel === 'hex' && cluster[colorModel]
									? cluster[colorModel][0]
									: `${colorModel}(${cluster[colorModel].join(',')})`}</th
							>
							<th>{cluster['neighbours'].split(':')[0].split('[')[0].replaceAll('_', ' ')}</th>
							<th>{Math.round(cluster['f'] * 100)}%</th>
							<th>{cluster['tags'].replaceAll(':', ' ')}</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
<section class="mt-8">
	<h2 class="font-semibold text-lg mb-8">Historgrams</h2>

	<h3 class="font-semibold">HSV</h3>
	<Historgram histogramData={data.histogram.hsv} />
	<h3 class="font-semibold">RGB</h3>
	<Historgram histogramData={data.histogram.rgb} />
	<h3 class="font-semibold">LCH</h3>
	<Historgram histogramData={data.histogram.lch} />
	<h3 class="font-semibold">LAB</h3>
	<Historgram histogramData={data.histogram.lab} />
</section>

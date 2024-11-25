<script>
	import { onMount } from 'svelte';
	import { fillMissingKeys } from '../lib/utils';

	export let histogramData = {};
	let chartId = 'chart-' + Math.ceil(Math.random() * 99);

	const parseObject = fillMissingKeys(histogramData);

	onMount(() => {
		if (parseObject) {
			c3.generate({
				bindto: '#' + chartId,
				data: {
					json: parseObject.data,
					type: 'area-step'
				},
				axis: {
					x: {
						tick: {
							values: parseObject?.tickValues
						}
					}
				},
				color: {
					pattern: ['#473144', '#80A4ED', '#AF1B3F']
				}
			});
		}
	});
</script>

<div id={chartId}></div>

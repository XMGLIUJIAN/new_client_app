<template>
	<view class="container">
		<l-echart ref="chartRef"></l-echart>
	</view>
</template>

<script lang="ts" setup>
	import * as echarts from 'echarts'
	import { ref } from 'vue'
	const chartRef = ref(null)
	const option = {
		color: ['#0067E0'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'value',
				data: [50, 100, 150, 200, 250, 300]
			}
		],
		yAxis: [
			{
				type: 'category',
				data: []
			}
		],
		series: [
			{
				name: 'Direct',
				type: 'bar',
				barWidth: '60%',
				data: []
			}
		]
	}


	const chartInit = async (levelArr:any,seriesArr:any) => {
		option.yAxis[0].data = levelArr
		option.series[0].data = seriesArr
		setTimeout(async () => {
			if (!chartRef.value) return
			const myChart = await chartRef.value.init(echarts)
			myChart.setOption(option)
		}, 500)
	}

	defineExpose({ chartInit })
</script>

<style lang="scss" scoped></style>
<template>
	<view class="container">
		<l-echart ref="chartRef"></l-echart>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import * as echarts from 'echarts'
	const chartRef = ref(null)
	const option = {
		color: ['#80FFA5', '#00DDFF'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: ['Saldo', 'Poin']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: ['1st', '10st', '20st', 'last']
			}
		],
		yAxis: [
			{
				type: 'value',
				position: 'left'
			}
		],
		series: [
			{
				name: 'Saldo',
				type: 'line',
				stack: 'Total',
				smooth: true,
				lineStyle: {
					width: 0
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgb(128, 255, 165)'
						},
						{
							offset: 1,
							color: 'rgb(1, 191, 236)'
						}
					])
				},
				emphasis: {
					focus: 'series'
				},
				data: [0, 0, 999999, 0]
			},
			{
				name: 'Poin',
				type: 'line',
				stack: 'Total',
				smooth: true,
				lineStyle: {
					width: 0
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgb(0, 221, 255)'
						},
						{
							offset: 1,
							color: 'rgb(77, 119, 255)'
						}
					])
				},
				emphasis: {
					focus: 'series'
				},
				data: [0, 0, 45, 0]
			}
		]
	}
	const chartInit = async (cashArr : any, integralArr : any) => {
		option.series[0].data = cashArr
		option.series[1].data = integralArr
		setTimeout(async () => {
			if (!chartRef.value) return
			const myChart = await chartRef.value.init(echarts)
			myChart.setOption(option)
		}, 500)
	}

	defineExpose({ chartInit })
</script>

<style lang="scss" scoped></style>
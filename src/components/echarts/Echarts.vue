<template>
	<div :id="id" :class="className">

	</div>
</template>

<script>
	import echarts from 'echarts';
	import 'echarts/map/js/china.js';

	export default {
		props: {
			// 初始化id
			id: {
				type: String,
				default: ''
			},
			// chart类名控制样式
			className: {
				type: String,
				default: ''
			},
			// chart配置参数
			options: {
				type: Object,
				default: function () {
					return {};
				}
			},
			isDataPanel: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				myChart: '' // chart实例
			};
		},
		mounted() {
			let contrastColor = '#848ea3';
			var theme = {
				backgroundColor: 'rgba(22,30,45,1)', // 图表背景颜色
				textStyle: {// 字体样式
					color: contrastColor,
					fontSize: '10'
				},
				legend: { // 分类字体样式
					textStyle: {
						color: contrastColor
					}
				},
				tooltip: { // 提示框宽度设为0
					axisPointer: {
						lineStyle: {
							width: '0'
						}
					}
				}
			};
			echarts.registerTheme('custom', theme);
			this.initChart();
		},
		methods: {
			// 初始化chart
			initChart(chartInstance, chartId) {
				setTimeout(() => {
					this.myChart = echarts.init(document.getElementById(this.id), this.isDataPanel ? 'custom' : '');
					this.setOption(this.myChart);
				}, 200);
			},
			// 设置chart配置
			setOption(chartInstance) {
				if (chartInstance) {
					chartInstance.setOption(this.options, true);
				}
			},
			// 清除重置chart
			clearChart(chartInstance) {
				chartInstance.clear();
			},
			resize () {
				console.log('走了resize');
				this.myChart.resize();
			}
		},
		watch: {
			options: {
				handler(val) {
					this.setOption(this.myChart, true);
				},
				deep: true
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>

import type { BarSeriesOption } from 'echarts/types/dist/shared';




export const useStackedBarChartv2 = () => {
  const optionStackedBar = (data: Ref<any[]>) => {
    // Extract job names for xAxis
    const jobNames = data.value.map(item => item.job);
  
    // Define series for each status with proper typing
    const statuses = ['pending', 'ongoing', 'passed', 'rejected', 'failed'];
    const series: BarSeriesOption[] = statuses.map((status, index) => ({
      name: status.toUpperCase(),
      type: 'bar' as const, // Important: use 'as const' for literal type
      stack: 'total',
      emphasis: { focus: 'series' },
      data: data.value.map(item => item[status]),
      itemStyle: {
        color: shadcnPalette[index],
        shadowColor: shadowPalette[index],
        borderRadius: [4, 4, 0, 0],
      },
      barWidth: '60%',
    }));

    return ref<ECOption>({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          let result = `<strong>${params[0].axisValue}</strong><br/>`;
          let total = 0;
          params.forEach((param: any) => {
            result += `${param.seriesName}: ${param.value}<br/>`;
            total += param.value;
          });
          result += `<hr/><strong>Total: ${total}</strong>`;
          return result;
        }
      },
      legend: {
        data: statuses.map(s => s.toUpperCase()),
        textStyle: { color: '#666' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: jobNames,
        axisLabel: { 
          color: '#666',
          rotate: 30, // Rotate labels if they're long
          interval: 0 // Show all labels
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#666' }
      },
      series: series
    });
  };

  return { optionStackedBar };
};


const getColorFromPalette = (index: number) => shadcnPalette[index % shadcnPalette.length];
const getShadowColorFromPalette = (index: number) => shadowPalette[index % shadowPalette.length];

export const useBarChart = () => {
  const optionBarChart = (data: Ref<ChartModel[]>) => {
    return ref<ECOption>({
      // legend: {},
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      xAxis: {
        type: "category",
        data: data.value.map((item) => item.name),
        axisLabel: { color: "#666" },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#666" },
      },
      series: [
        {
          name: "Count",
          type: "bar",
          data: data.value.map((item, index) => ({
            name: item.name,
            value: item.value,
            itemStyle: {
              color: getColorFromPalette(index), // Assign color from palette
              shadowColor: getShadowColorFromPalette(index), // Assign shadow color
              borderRadius: [8, 8, 0, 0], // Slightly rounded corners
              borderType: "solid",
            },
          })),
          barWidth: "50%",
        },
      ],
      grid: {
        containLabel: true,
        left: "2%",
        right: "2%",
        bottom: "10%",
      },
    });
  };

  return { optionBarChart };
};

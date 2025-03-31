

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
      graphic: data.value.length === 0 ? [
        // SVG Icon
        {
          type: "image",
          left: "center",
          top: "30%",
          style: {
            image: "/static-icon/file.png", // Replace with your SVG URL
            width: 50,
            height: 50,
          },
        },
        // No Data Text
        {
          type: "text",
          left: "center",
          top: "50%",
          style: {
            text: "Please Select Department / No Data Available ",
            fontSize: 18,
            fontWeight: "bold",
            fill: "#999",
            textAlign: "center",
          },
        },
      ] : [],
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

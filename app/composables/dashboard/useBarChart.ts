const shadcnPalette = [
  "#1E293B", // Dark Blue
  "#3B82F6", // Blue
  "#22C55E", // Green
  "#EAB308", // Yellow
  "#F97316", // Orange
  "#EF4444", // Red
  "#A855F7", // Purple
  "#EC4899", // Pink
  "#14B8A6", // Teal
  "#6366F1", // Indigo
];

const shadowPalette = [
  "rgba(30, 41, 59, 0.4)",  // Dark Blue
  "rgba(59, 130, 246, 0.3)", // Blue
  "rgba(34, 197, 94, 0.3)",  // Green
  "rgba(234, 179, 8, 0.3)",  // Yellow
  "rgba(249, 115, 22, 0.3)", // Orange
  "rgba(239, 68, 68, 0.3)",  // Red
  "rgba(168, 85, 247, 0.3)", // Purple
  "rgba(236, 72, 153, 0.3)", // Pink
  "rgba(20, 184, 166, 0.3)", // Teal
  "rgba(99, 102, 241, 0.3)", // Indigo
];

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

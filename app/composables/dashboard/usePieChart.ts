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

const getColor = (index: number) => shadcnPalette[index % shadcnPalette.length];
const getShadowColor = (index: number) => shadowPalette[index % shadowPalette.length];

export const usePieChart = () => {
  const optionPie = (data: Ref<ChartModel[]>) => {
    return ref<ECOption>({
      legend: {
        left: "center",
        bottom: "bottom",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: {
            show: true,
            readOnly: false,
            optionToContent: (opt: { series: { data: { name: string; value: number }[] }[] }) => {
              const table = `<table style="width:100%; text-align:center; border-collapse:collapse;">
                  <thead>
                    <tr>
                      <th style="border:1px solid #ddd; padding:8px;">Name</th>
                      <th style="border:1px solid #ddd; padding:8px;">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${opt.series[0]?.data
                  .map(
                    (item: { name: string; value: number }) =>
                      `<tr>
                            <td style="border:1px solid #ddd; padding:8px;">${item.name}</td>
                            <td style="border:1px solid #ddd; padding:8px;">${item.value}</td>
                          </tr>`
                  )
                  .join("")}
                  </tbody>
                </table>`;
              return table;
            },
            contentToOption: (currentOpt: any, { series }: any) => ({
              ...currentOpt,
              series,
            }),
          },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "Area Mode",
          type: "pie",
          radius: [20, 140],
          center: ["50%", "45%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 5,
          },
          data: data.value.map((item, index) => ({
            name: item.name,
            value: item.value,
            itemStyle: {
              color: getColor(index),
              shadowColor: getShadowColor(index),
              shadowBlur: 10,
              shadowOffsetX: 3,
              shadowOffsetY: 3,
            },
          })),
        },
      ],
    });
  };

  return { optionPie };
};

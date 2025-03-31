

const shadowPalette = shadcnPalette.map((color) => color.replace(")", ", 0.3)").replace("rgb", "rgba"));

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
      graphic: {
        type: "text",
        left: "center",
        top: "middle",
        style: {
          text: data.value.length === 0 ? "No Data Available" : "",
          fontSize: 18,
          fontWeight: "bold",
          fill: "#999",
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

export const usePerformance = (
    chart: Ref<any>,
) => {
    const getCategoryScore = (data: CategoryCountModel[]): ECOption => {
        const shadcnDarkColors = [
            "#0a0a0a", // black
            "#1f1f1f", // dark gray
            "#3f3f3f", // medium gray
            "#525252", // lighter gray
            "#737373", // soft gray
        ];

        return {
            animation: true,
            animationEasing: "elasticIn",
            animationDuration: 100,
            legend: {},

            tooltip: {
                className: "echarts-tooltip",
            },
            grid: {
                containLabel: true,
                left: "2%",
                right: "2%",
                bottom: "10%",
            },
            toolbox: {
                show: false,
                feature: {
                    dataZoom: {},
                    saveAsImage: {},
                },
            },
            dataset: {

                source: data.map((item) => item)
            },
            xAxis: { type: "category" },
            yAxis: {},
            itemStyle: { borderRadius: 5 },
            series: data.map((item, index) => ({
                type: 'bar',
                itemStyle: {
                    color: shadcnDarkColors[index]
                }
            }))

        };
    }



    const hideToolbox = () => {
        chart.value?.setOption({ toolbox: { show: false } });
    }
    const showToolbox = () => {
        chart.value?.setOption({ toolbox: { show: true } });
    }

    return {
        hideToolbox,
        showToolbox,
        getCategoryScore
    }

};
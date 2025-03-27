export const useStackedBar = (
    data: Ref<any>
) => {


    const optionCategory = shallowRef(getCategoryScore());
    function getCategoryScore(): ECOption {
        const shadcnDarkColors = [
            "#0a0a0a", // black
            "#1f1f1f", // dark gray
            "#3f3f3f", // medium gray
            "#525252", // lighter gray
            "#737373", // soft gray
        ];

        // Transform the data into the required format
        const transformedData = data.value.map((item:any) => {
            const row = [item.Category]; // Start with the category name
            Object.keys(item).forEach((key) => {
                if (key !== "Category") {
                    row.push(String(item[key])); // Add the values for each key
                }
            });
            return row;
        }) || [];

        const headers = ["Category", ...Object.keys(data.value[0] || {}).filter((key) => key !== "Category")];


        const capitalizedHeaders = headers.slice(1).map((header) =>
            header
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
        );

        return {
            animation: true,
            animationEasing: "elasticIn",
            animationDuration: 100,
            legend: {
                data: capitalizedHeaders,
            },
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
                source: [headers, ...transformedData],
            },
            xAxis: { type: "category" },
            yAxis: {},
            itemStyle: { borderRadius: 5 },
            series: headers.slice(1).map((header, index) => ({
                type: "bar",
                name: capitalizedHeaders[index],
                itemStyle: {
                    color: shadcnDarkColors[index % shadcnDarkColors.length],
                },
            })),
        };
    }

    watch(
        data,
        (newData) => {
            optionCategory.value = getCategoryScore();
        },
        { deep: true }
    )



    return {
        optionCategory,
    }

};
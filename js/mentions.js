// Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
var chart;
var chartData;
var unfilteredChartData;

//Data processing
function processData() {

    unfilteredChartData = putDataIntoChartFormat(chartData);

    var filteredData = _.filter(chartData, function (entry) {

        if (!filters.media.PRESS && (entry.media == 'PRESS')) return false;
        if (!filters.media.CONSUMER && (entry.media == 'CONSUMER')) return false;

        if (!filters.gender.MALE && (entry.gender == 'MALE')) return false;
        if (!filters.gender.FEMALE && (entry.gender == 'FEMALE')) return false;
        if (!filters.gender.UNKNOWN && (entry.gender == 'UNKNOWN')) return false;

        if (!filters.country.ZA && (entry.country == 'ZA')) return false;
        if (!filters.country.GB && (entry.country == 'GB')) return false;
        if (!filters.country.US && (entry.country == 'US')) return false;
        if (!filters.country.AU && (entry.country == 'AU')) return false;

        return true;
    });

    var data = putDataIntoChartFormat(filteredData);

    return [
        {
            key: 'All',
            values: unfilteredChartData,
            color: '#006837'
        },
        {
            values: data,
            key: 'Filtered',
            color: '#ffffff'
        }
    ];
}

function putDataIntoChartFormat(dataToProcess) {
    var data = [];
    var dataForDay;

    for (var i = 0; i < dataToProcess.length; i++) {
        var dateForEntry = u.parseDate(dataToProcess[i].published);
        if (dataForDay && (dataForDay.x.getTime() == dateForEntry.getTime())) {
            dataForDay.y += dataToProcess[i].count;
        }
        else {
            dataForDay = {x: dateForEntry, y: dataToProcess[i].count, size: 100000};
            data.push(dataForDay);
        }
    }

    return data;
}

//Initialization
function init() {

    var apiEndPoint = "/api/mentions";
    if (today) {
        apiEndPoint += "?today=true"
    }

    u.query(apiEndPoint, function (data) {
        chartData = data;

        nv.addGraph(function () {
                chart = nv.models.lineChart()
                    .options({
                        margin: {top: 150, left:105, right: 110, bottom:130},
                        showXAxis: true,
                        showYAxis: true,
                        transitionDuration: chartConfig.defaultTransitionDuration,
                        showLegend: false,
                        useInteractiveGuideline: true
                    });

                chart.xAxis
                    .showMaxMin(false)
                    .tickFormat(function (d) {
                        return d3.time.format(today ? "%H:00" : '%d %b')(new Date(d));
                    })
                ;

                chart.yAxis
                    .showMaxMin(false)
                    .showMaxMin(false)
                    .tickFormat(d3.format('.0f'));

                d3.select('#chart svg')
                    .datum(processData())
                    .call(chart);

                d3.selectAll('circle.nv-point').attr('r', function (d, i) {
                    return 10;
                });

                u.drawHeadingsAndLogo(d3, 'Total volume of online mentions (over time, to date)', u.getDateSubHeading(today, chartData));

                nv.utils.windowResize(chart.update);

                chart.dispatch.on('stateChange', function (e) {
                    nv.log('New State:', JSON.stringify(e));
                });

                updateFilterClasses();

                return chart;
            }
        )
    })
}

function downloadChartAsSvg() {
    var svgData = u.convertSVGElementToXML($('#chartSvg'));

    u.saveData(svgData, 'Oscar_Pistorius_mentions' + u.formatDate() + '.svg');
}

init();
<script lang="ts" setup>
import * as d3 from 'd3';
import router from '@/router';

import { onMounted } from 'vue';

function goTo(location: string) {
    router.push(location);
}

onMounted(() => {
    // The svg
    const svg = d3.select('svg'),
        width = +svg.attr('width'),
        height = +svg.attr('height');

    // Map and projection
    const projection = d3
        .geoMercator()
        .scale(98)
        .center([0, 20])
        .translate([width / 2, height / 2]);

    // Data and color scale
    const data = new Map();
    const colorScale = d3
        .scaleThreshold()
        .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
        .range(d3.schemePurples[7]);

    // Load external data and boot
    Promise.all([
        d3.json(
            'https://gist.githubusercontent.com/Yuriks1/2d8d2e716008eb7fce62f238f190fb87/raw/40a891fb79a775f31a5b3cb6043ccc87a24a0968/continents.json',
        ),
    ]).then(function (loadData) {
        let topo: any = loadData[0];
        console.log(topo);

        function mouseOver() {
            d3.selectAll('.Continent').transition().duration(100).style('opacity', 0.5);
            d3.select(this).transition().duration(100).style('opacity', 1).style('stroke', 'var(--color-light-blue)');
        }

        function mouseLeave() {
            d3.selectAll('.Continent').transition().duration(200).style('opacity', 0.8);
            d3.select(this).transition().duration(200).style('stroke', 'transparent');
        }

        function mouseClick(event: PointerEvent) {
            if (event.target) {
                const target = event.target as Element;
                console.log('clicked', target.id);

                if (target.id == 'Europe') {
                    goTo('/quiz');
                }
            }
        }

        // Draw the map
        svg.append('g')
            .selectAll('path')
            .data(topo.features)
            .enter()
            .append('path')
            // draw each country
            .attr('d', d3.geoPath().projection(projection))
            // set the color of each country
            .attr('fill', function (d: any) {
                d.total = data.get(d.id) || 0;
                return colorScale(d.total);
            })
            .style('stroke', 'transparent')
            .attr('id', function (d: any) {
                return d.properties.CONTINENT;
            })
            .attr('class', function () {
                return 'Continent';
            })

            .style('opacity', 0.8)
            .on('mouseover', mouseOver)
            .on('mouseleave', mouseLeave)
            .on('click', mouseClick);
    });
});
</script>

<template>
    <!-- Create an element where the map will take place -->
    <svg id="my_dataviz" class="my_continent" height="700" width="900"></svg>
</template>

<style scoped>
.my_continent {
    align-items: center;
    display: flex;
    flex-direction: column;
}
</style>

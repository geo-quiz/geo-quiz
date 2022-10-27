<script lang="ts" setup>
import * as d3 from 'd3';
import router from '@/router';
import { onMounted } from 'vue';
import ArrowLeftCircleOutlineIcon from 'vue-material-design-icons/ArrowLeftCircleOutline.vue';
import ArrowRighttCircleOutlineIcon from 'vue-material-design-icons/ArrowRightCircleOutline.vue';


onMounted(() => {
  // The svg
  const svg = d3.select('#my_dataviz'),
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
  const colorScale = d3.scaleThreshold().domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000]);

  // Load external data and boot
  Promise.all([
    d3.json(
        'https://gist.githubusercontent.com/Yuriks1/9a83cade3100b21589e02b864875c384/raw/1a65730048d10e907ff7031916c49de46fe04d3e/continents_afr_eur.json',
    ),
  ]).then(function (loadData) {
    let topo: any = loadData[0];
    console.log(topo);

    function mouseOver() {
      d3.selectAll('.Continent').transition().duration(50).style('opacity', 0.5);
      d3.select(this).transition().duration(50).style('opacity', 1).style('fill', 'var(--color-light-green)');
    }

    function mouseLeave() {
      d3.selectAll('.Continent').transition().duration(50).style('opacity', 1);
      d3.select(this).transition().duration(50).style('fill', 'var(--color-blue)');
    }

    function mouseClick(event: PointerEvent) {
      if (event.target) {
        const target = event.target as Element;
        console.log('clicked', target.id);

        switch (target.id) {
          case 'Africa':
            router.push({ name: 'quiz-question', params: { id: 'africa' } });
            break;
          case 'Europe':
            router.push({ name: 'quiz-question', params: { id: 'europe' } });
            break;
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
        .style('fill', 'var(--color-blue)')
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
  <div class="header_under__title">
    <h1>Europe / Asia</h1>
    <p>Click to play</p>
    <div class="header_under__map">
      <svg id="my_dataviz" width="250" height="300"></svg>

    </div>
    <ArrowLeftCircleOutlineIcon
        :size="48"
        class="return-button"
        fillColor="var(--color-white)"
        @click="$router.back()" />
    <ArrowRighttCircleOutlineIcon
        :size="48"
        class="return-button"
        fillColor="var(--color-white)"
        @click="$router.back()" />
  </div>
</template>

<style scoped>


h1 {
  margin: 0
}



.header_under__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 116px;
  gap: calc(var(--gap) * 2);
}

.header_under__map {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>

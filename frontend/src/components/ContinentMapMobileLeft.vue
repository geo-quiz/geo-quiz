<script lang="ts" setup>
import * as d3 from 'd3';
import router from '@/router';
import { onMounted } from 'vue';
import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue';


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
        'https://gist.githubusercontent.com/Yuriks1/a6a7c96d731299f3e3cbf5c0d8f1b244/raw/cdbce271de74967daabd34a7147398d221198787/continents_n_s_america.json',
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

          case 'North America':
            router.push({ name: 'quiz-question', params: { id: 'north-america' } });
            break;
          case 'South America':
            router.push({ name: 'quiz-question', params: { id: 'south-america' } });
            break;
          default:
            router.push('/quizMob');
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
    <h1>N.America / S. America</h1>
    <p>Click to play</p>
    <ArrowRightIcon
        :size="60"
        class="right-button"
        fillColor="var(--color-white)"
        @click="router.push('/quizMob')" />
    <div class="header_under__map">
      <svg id="my_dataviz" width="600" height="490"></svg>
    </div>
  </div>
</template>

<style scoped>

#my_dataviz{
  transform: translate(20%, 0%);

}


.right-button{
  position: absolute;
  top: 40%;
  right: 0;
  transform: translate(0%, -30%);
  cursor: pointer;}


h1 {
  margin: 0
}



.header_under__title {
  display: contents;
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

<script setup lang="ts">
import LogicFlow from '@logicflow/core';
import "@logicflow/core/lib/style/index.css";
import { GlobalDrag } from '../lib';
import { onMounted } from 'vue';

onMounted(() => {
  const lf = new LogicFlow({
    container: document.getElementById('logicflow-container') as HTMLElement,
    plugins: [GlobalDrag],
    keyboard: {
      enabled: true,
    },
  })

  const data = {
    nodes: [
      {
        id: '10',
        type: 'rect',
        x: 100,
        y: 100,
        text: 'rect',
      },
      {
        id: '20',
        type: 'circle',
        x: 300,
        y: 100,
        text: 'circle',
      },
    ],
    edges: [
      {
        type: 'polyline',
        sourceNodeId: '10',
        targetNodeId: '20',
      },
    ],
  };

  lf.render(data);
})
</script>

<template>
  <div id="logicflow-container"></div>
</template>

<style scoped>
#logicflow-container {
  width: 60vw;
  height: 60vh;
}
</style>

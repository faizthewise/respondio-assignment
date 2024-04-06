<script setup lang="ts">
import type { EdgeProps } from "@vue-flow/core";
import { BezierEdge } from "@vue-flow/core";

import type { EdgeCustomData } from "@/ts/interface";

// props were passed from the slot using `v-bind="customEdgeProps"`
const props = defineProps<EdgeProps<EdgeCustomData>>();
</script>

<script lang="ts">
export default {
  name: "CustomEdge",
};
</script>

<template>
  <BezierEdge
    :source-x="sourceX"
    :source-y="sourceY"
    :target-x="targetX"
    :target-y="targetY"
    :source-position="sourcePosition"
    :target-position="targetPosition"
  />
</template>

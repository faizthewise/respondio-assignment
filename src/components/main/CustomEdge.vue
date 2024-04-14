<script setup lang="ts">
import { BezierEdge } from "@vue-flow/core";

import type { EdgeProps } from "@vue-flow/core";
import type { EdgeCustomData } from "@/ts/interface";

defineProps<EdgeProps<EdgeCustomData>>();
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

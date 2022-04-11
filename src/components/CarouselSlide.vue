<template>
  <transition :name="dir">
    <div v-show="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    visible() {
      return this.index === this.$parent.index;
    },
    dir() {
      console.log(this.$parent.slideDirection);
      return this.$parent.slideDirection;
    },
  },
};
</script>

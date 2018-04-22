<template>
  <mt-spinner
    type="double-bounce"
    :color="spinnerColor"
  ></mt-spinner>
</template>

<script>
export default {
  name: 'Loading',
  computed: {
    spinnerColor () {
      return this.color || '#80bd01'
    }
  },

  props: {
    color: String
  }
}
</script>

<style>
.mint-spinner-double-bounce{
  margin: 0 auto;
}
</style>

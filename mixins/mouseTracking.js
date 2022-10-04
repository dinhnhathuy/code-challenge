export default {
  data() {
    return {
      x: 0,
      y: 0,
      rect: {
        left: 0,
        top: 0,
      },
    }
  },
  mounted() {
    this.rect = this.$el.getBoundingClientRect()
    this.$el.addEventListener('mousemove', this.handler, false)
  },
  methods: {
    handler(e) {
      this.x = Math.floor(e.clientX - this.rect.left)
      this.y = Math.floor(e.clientY - this.rect.top)
    },
  },
}

<script>
import { mapGetters } from 'vuex'

/**
 * Picks a set of sounds from the store
 */
export default {
  name: 'SoundPicker',
  props: {
    picked: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data: function () {
    return {}
  },
  computed: {
    ...mapGetters(['sounds'])
  },
  methods: {
    isPicked (soundId) {
      return this.picked.includes(soundId)
    },
    setPicked (soundId, isPicked) {
      const wasPicked = this.picked.includes(soundId)

      let nowPicked
      if (wasPicked === isPicked) {
        // as it should be, do nothing
        return
      } else if (wasPicked && !isPicked) {
        // previously picked, now unpicked, remove before emitting
        nowPicked = this.picked.filter(p => p !== soundId)
      } else if (!wasPicked && isPicked) {
        // not picked before, now picked, add before mitting
        nowPicked = this.picked.concat(soundId)
      }

      this.$emit('picked', nowPicked)
    }
  }
}
</script>

<template>
  <article class="sound-picker">
    <label
      v-for="sound in sounds"
      :key="`select-${sound.id}`"
      class="stack"
    >

      <input
        name="sound-picker-sounds"
        type="checkbox"
        :checked="isPicked(sound.id)"
        @change="setPicked(sound.id, $event.target.checked)"
      >
      <span class="button toggle">{{ sound.name }}</span>
    </label>
  </article>
</template>

<style lang="scss">
@use "../../style/variables/layout";

main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.main-content {
  position: absolute;
  top: layout.$header-height;
  left: 0;
  right: 0;
  bottom: 0;
}

.main-content-inner {
  display: flex;
  align-items: stretch;
  height: 100%;
}

.main-content-center {
  flex-grow: 1;
  overflow: auto;
}
</style>

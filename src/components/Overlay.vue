<template>
  <SlideYUpTransition :duration="animationDuration">
    <div class="modal fade"
         @click.self="closeModal"
         :class="[{'show d-block': show}, {'d-none': !show}, {'modal-mini': type === 'mini'}]"
         v-show="show"
         tabindex="-1"
         role="dialog"
         :aria-hidden="!show">

      <div class="modal-dialog modal-dialog-centered"
           :class="[{'modal-notice': type === 'notice'}, modalClasses]">
        <div class="modal-content overlay" :class="[gradient ? `bg-gradient-${gradient}` : '',modalContentClasses]">
          <slot></slot>
        </div>
      </div>

    </div>
  </SlideYUpTransition>
</template>
<script>
import { SlideYUpTransition } from "vue2-transitions";

export default {
  name: "overlay",
  components: {
    SlideYUpTransition
  },
  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "",
      validator(value) {
        let acceptedValues = ["", "notice", "mini"];
        return acceptedValues.indexOf(value) !== -1;
      },
      description: 'Modal type (notice|mini|"") '
    },
    modalClasses: {
      type: [Object, String],
      description: "Modal dialog css classes"
    },
    modalContentClasses: {
      type: [Object, String],
      description: "Modal dialog content css classes"
    },
    gradient: {
      type: String,
      description: "Modal gradient type (danger, primary etc)"
    },
    headerClasses: {
      type: [Object, String],
      description: "Modal Header css classes"
    },
    animationDuration: {
      type: Number,
      default: 500,
      description: "Modal transition duration"
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:show", false);
      this.$emit("close");
    }
  },
  watch: {
    show(val) {
      let documentClasses = document.body.classList;
      if (val) {
        documentClasses.add("modal-open");
      } else {
        documentClasses.remove("modal-open");
      }
    }
  }
};
</script>
<style>
.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
}

.overlay{
  background-color: transparent !important;
}
</style>

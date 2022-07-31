<template>
    <div id="app">
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <overlay :show.sync="visible">

          <pulse-loader color="white" size="100px" />

        </overlay>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import PulseLoader from 'vue-spinner/src/ClipLoader.vue'
import Overlay from './components/Overlay.vue';

export default {
  components: {
    FadeTransition,
    PulseLoader,
    Overlay
  },
};
</script>

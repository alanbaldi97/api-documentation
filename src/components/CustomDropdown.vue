<template>
    <base-dropdown>
        <base-button slot="title" :type="color" class="dropdown-toggle">
            {{ labelSelect || 'Seleccionar' }}
        </base-button>
        <a v-for="(option, index) in options" class="dropdown-item" href="#" :key="index" @click="onSelected(option)">{{ optionValue ? option[optionValue] : option  }}</a>
    </base-dropdown>
</template>
<script>
import BaseDropdown from './BaseDropdown.vue'
export default {
    components:{ BaseDropdown },
    props:{
        color: {
            type:String,
            default: 'primary'
        },
        placeholder:{
            type: String,
            default: ''
        },
        value:{
            type:null,
            default:null,
        },
        options:{
            type:Array,
            default: () => ([])
        },
        optionLabel:{
            type:String,
            default: null,
        },
        optionValue:{
            type:String,
            default: null
        }

    },
    created(){
        this.onSelected(this.value);
    },
    data(){
        return {
            labelSelect:'',
        }
    },
    computed:{
        select:{
            set(val){
                this.$emit('input', val)
            },
            get(){
                return this.value;
            }
        }
    },
    methods:{
        onSelected(option){
            if(this.optionLabel){
                this.labelSelect = option[this.optionLabel];
            }

            if(this.optionValue){
                this.select = option[this.optionValue];
            }else {
                this.labelSelect = option;
                this.select = option;
            }
        }
    }
}
</script>
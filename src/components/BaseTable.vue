<template>
    <div class="table-responsive">
        <table class="table align-items-center mb-0">
            <thead>
                <tr>
                    <th v-for="(header, index) in columns" class="text-center text-xxs font-weight-bolder" :key="index">
                        <slot :name="`header-${header.column}`">
                            {{ header.label }}
                        </slot>
                    </th>
                    <th></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(record, index) in records" :key="index">
                    <td v-for="header in columns" class="text-center" :key="header.column">
                        {{ record[header.column] }}
                    </td>
                    <td>
                        <base-button class="ml-2" size="sm"  @click="$emit('on-delete')"> Eliminar </base-button>
                        <base-button v-if="index == records.length - 1"  class="ml-2" size="sm"  @click="$emit('on-add')"> Add </base-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>
<script>
export default {

    props:{
        columns:{
            type:Array,
            default: () => ([])
        },
        records: {
            type:Array,
            default:() => ([])
        }
    }
    
}
</script>
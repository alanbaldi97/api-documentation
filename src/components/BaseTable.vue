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
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(record, index) in records" :key="index">
                    <template v-for="header in columns" >
                        <slot :name="`cell-${header.column}`" :item="record" :rowIndex="index">
                            <td class="text-center" :key="header.column">
                                {{ record[header.column] }}
                            </td>
                        </slot>
                        
                    </template>
                    
                    
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
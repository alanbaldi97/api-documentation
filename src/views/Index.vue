<template>
    <div class="bg-default p-3" style="height:100vh"  >
        <div class="row justify-content-center">

            <div class="col-md-8">

                <card>
                    
                    <div class="row justify-content-center">
                        <custom-dropdown color="default" v-model="typeRequest" :options="options"></custom-dropdown>
                        <base-input class="w-75" placeholder="https://example.com" ></base-input>
                        <base-dropdown>
                            <base-button class="ml-2" size="md"  > Send </base-button>
                        </base-dropdown>
                        
                        
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <tabs>
                                <tab-pane>
                                    <span slot="title">
                                        <i class="ni ni-cloud-upload-96" />
                                        Query Params
                                    </span>


                                    <base-table :columns="columns" :records="[]" />
                                    
                                </tab-pane>
                                <tab-pane title="Profile">
                                    <span slot="title">
                                        Headers <badge type="default">4</badge>
                                    </span>
                                    
                                    <base-table :columns="columns" :records="[]" />
                                
                                </tab-pane>
                                <tab-pane title="Body">
                                    <span slot="title">
                                        <i class="ni ni-bell-55 mr-2" />
                                        Body
                                    </span>

                                    <vue-json-editor v-model="records" :show-btns="false" :expandedOnStart="true"></vue-json-editor>
                                
                                </tab-pane>
                                
                            </tabs>
                        </div>
                        

                    </div>

                    <div class="row">
                        <div class="col-md-12">
                           
                        </div>
                    </div>

                </card>

            </div>

        </div>

    </div>
</template>
<script>
import Card from '../components/Card.vue'
import CustomDropdown from '../components/CustomDropdown.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import Tabs from '../components/Tabs/Tabs.vue'
import TabPane from '../components/Tabs/TabPane.vue'
import Badge from '../components/Badge.vue'
import BaseTable from '../components/BaseTable.vue'
import vueJsonEditor from 'vue-json-editor'

export default {
    components: { Card, CustomDropdown, BaseInput, BaseButton, Tabs, TabPane, Badge, BaseTable, vueJsonEditor },

    data(){
        return {
            options:[
                'GET',
                'POST',
                'PUT',
                'DELETE',
                'PATCH'
            ],
            typeRequest:null,

            columns: [
                {
                    label:'Key',
                    column: 'key'
                },
                {
                    label:'Value',
                    column: 'value'
                }
            ],
            records:null
            
        }
    },
    watch:{
        records(va){
            console.log(va);
        }
    }


    
}
</script>
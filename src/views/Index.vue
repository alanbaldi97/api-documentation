<template>
    <div class="bg-default p-3" style="height:100vh"  >
        <div class="row justify-content-center">

            <div class="col-md-8">

                <card>
                    
                    <div class="row justify-content-center">
                        <custom-dropdown v-model="request.method" color="default" :options="options"></custom-dropdown>
                        <base-input v-model="request.url" class="w-75" placeholder="https://example.com" ></base-input>
                        <div><base-button class="ml-2" size="md"  @click="send"> Send </base-button></div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <tabs>
                                <tab-pane>
                                    <span slot="title">
                                        Query Params
                                    </span>


                                    <base-table :columns="columns" :records="[]" />
                                    
                                </tab-pane>
                                <tab-pane title="Profile">
                                    <span slot="title">
                                        Headers <badge type="default">{{ countHeaders }}</badge>
                                    </span>
                                    
                                    <base-table :columns="columns" :records="headers" @on-add="onAdd" >

                                    
                                    </base-table>
                                
                                </tab-pane>
                                <tab-pane title="Body">
                                    <span slot="title">
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
import Request from '../Request'
import BaseDropdown from '../components/BaseDropdown.vue'
import { Formater } from '../core';

export default {
    components: { Card, CustomDropdown, BaseInput, BaseButton, Tabs, TabPane, Badge, BaseTable, vueJsonEditor, BaseDropdown },
    data(){
        return {
            options:[
                'GET',
                'POST',
                'PUT',
                'DELETE',
                'PATCH'
            ],
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
            records:null,
            body:null,
            headers:[
                {
                    key: 'Accept',
                    value: '*/*'
                },
                {
                    key: 'User-Agent',
                    value : 'Api Documentation'
                },
            ],
            request:{
                url:null,
                data:null,
                headers:null,
                method:null,
            },

            simulateObject:{
                dataArray:[1,2,3,4,5,6],
                dataBoolean:true,
                dataDateTime: '2012-02-12 01:02:02',
                dataDate: '2012-02-12',
                dataFloat: 1.23,
                dataInteger: 1,
                dataObject:{
                    attribute: {
                        dataInteger: 1,
                    }
                },
                dataString: 'hola mundo'
            }
            
        }
    },
    computed:{
        countHeaders(){
            return this.headers.length;
        }
    },
    methods:{
        async send(){

            let headers = {};
            for(let header in this.headers){
                headers[header.key] = header.value;
            }


            const records = await Request.send({...this.request, headers});
            const f = Formater.format(records.data);
            console.log(f);
        },
        onAdd(){
            this.headers.push({
                key:null,
                value:null
            });
        }

    }


    
}
</script>
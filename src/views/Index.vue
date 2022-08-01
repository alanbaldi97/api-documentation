<template>
    <div class="bg-default p-3" style="height:100vh;overflow-y:auto"  >
        <div class="row justify-content-center">

            <div class="col-md-8">
                <card>
                    
                    <div class="row justify-content-center">
                        <custom-dropdown v-model="request.method" color="default" :options="options"></custom-dropdown>
                        <base-input v-model="request.url" class="w-75" placeholder="https://example.com" ></base-input>
                        <div>
                            <base-button class="ml-2" size="md"  @click="send"> 
                                <template v-if="!loading">
                                    Send
                                </template>
                                <clip-loader v-else color="white" size="25px"></clip-loader>
                            </base-button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <tabs>
                                <tab-pane>
                                    <span slot="title">
                                        Query Params
                                    </span>

                                    <base-table v-if="request.url && request.url !== ''"  :columns="columns" :records="parameters" >
                                        <template v-slot:cell-key="{item}">
                                            <td>
                                                <base-input v-model="item.key" class="w-75" placeholder="Key" />
                                            </td>
                                            
                                        </template>
                                        <template v-slot:cell-value="{item}">
                                            <td>
                                                <base-input v-model="item.value" class="w-75" placeholder="Value" />
                                            </td>
                                           
                                        </template>
                                        <template v-slot:cell-actions="{rowIndex}">
                                            <td>
                                                <base-button class="ml-2" size="sm"  @click="removeParameter(rowIndex)"> Remove </base-button>
                                                <base-button v-if="rowIndex == parameters.length - 1"  class="ml-2" size="sm"  @click="addParameter"> Add </base-button>
                                            </td>
                                        </template>
                                    
                                    </base-table>
                                    
                                </tab-pane>
                                <tab-pane title="Profile">
                                    <span slot="title">
                                        Headers <badge type="default">{{ countHeaders }}</badge>
                                    </span>
                                    
                                    <base-table :columns="columns" :records="headers" @on-add="onAdd" >
                                        <template v-slot:cell-key="{item}">
                                            <td>
                                                <base-input v-model="item.key" class="w-75" placeholder="Key" />
                                            </td>
                                            
                                        </template>
                                        <template v-slot:cell-value="{item}">
                                            <td>
                                                <base-input v-model="item.value" class="w-75" placeholder="Value" />
                                            </td>
                                           
                                        </template>
                                        <template v-slot:cell-actions="{rowIndex}">
                                            <td>
                                                <base-button class="ml-2" size="sm"  @click="$emit('on-delete')"> Remove </base-button>
                                                <base-button v-if="rowIndex == headers.length - 1"  class="ml-2" size="sm"  @click="onAdd"> Add </base-button>
                                            </td>
                                        </template>
                                    
                                    </base-table>
                                
                                </tab-pane>
                                <tab-pane title="Body">
                                    <span slot="title">
                                        Body
                                    </span>

                                    <vue-json-editor v-model="request.data" :show-btns="false" :expandedOnStart="true"></vue-json-editor>
                                
                                </tab-pane>
                                <tab-pane v-if="response && !loading" title="Response">
                                    <span slot="title">
                                        Response
                                    </span>
                                    
                                    <tabs>
                                        <tab-pane title="Response">
                                            <card style="border: 2px solid #a9a6a6; cursor:text" >
                                                <label :style="{ display:'inherit'}" for="">status : <span :style="{'color': response.status == 200 ? 'green' : '', 'font-weight' : 'bold'}"> {{ response.status }} </span> </label>
                                                <label :style="{ display:'inherit'}" for="" >params: <span> ({{ parameters.map( item => item.key).join(',') }}) </span></label>
                                                <template v-for="(itemType, index) in responseFormatter">
                                                    <label :style="{ display:'inherit'}" for="" :key="index" >{{ itemType.type  }}  <span :style="{'color': response.status == 200 ? 'green' : '', 'font-weight' : 'bold'}">{{ itemType.name }}</span>  </label>
                                                </template>
                                            </card>
                                            
                                        </tab-pane>
                                        <tab-pane title="Headers">
                                            <card >
                                                <template v-for="(key, index) in Object.keys(response.headers)">
                                                    <label :style="{ display:'inherit',textTransform:'uppercase'}" for="" :key="index">{{ key }} : <span :style="{'color': response.status == 200 ? 'green' : '', 'font-weight' : 'bold'}"> {{ response.headers[key] }} </span> </label>
                                                </template>
                                            </card>
                                        </tab-pane>
                                    </tabs>
                                   
                                    
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
import { Formater, Url } from '../core';

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
                    column: 'key',
                },
                {
                    label:'Value',
                    column: 'value'
                },
                {
                    label:'',
                    column: 'actions'
                }
            ],
            records:null,
            body:null,
            headers:[
                {
                    key: 'Accept',
                    value: '*/*',
                },
                {
                    key: 'User-Agent',
                    value : 'Api Documentation',
                },
            ],
            request:{
                url:null,
                data:null,
                headers:null,
                method:'GET',
            },
            response:null,
            responseFormatter:null,
            parameters:[
                {
                    key:null,
                    value:null,
                }
            ],
            loading:false,
        }
    },
    computed:{
        countHeaders(){
            return this.headers.length;
        }
    },
    watch:{
        parameters:{
            handler(newVal){
                let url = Url.addParameters(this.request.url, newVal);
                this.request.url = url;
            },
            deep:true
        } 
    },
    methods:{
        async send(){

            try {
                this.loading = true;
                let headers = {};
                for(let header of this.headers){
                    headers[header.key] = header.value;
                }

                const response = await Request.send({...this.request, headers});
                const fomatter = Formater.format(response.data);
                this.responseFormatter = fomatter;
                this.response = response;
                
            } catch (error) {
                this.response = error.response || null;
            }finally{
                this.loading = false;
            }

        },
        onAdd(){
            this.headers.push({
                key:null,
                value:null
            });
        },
        addParameter(){
            this.parameters.push({
                key:null,
                value:null
            });
        },
        removeParameter(index){
            this.parameters.splice(index, 1);
        }

    }


    
}
</script>
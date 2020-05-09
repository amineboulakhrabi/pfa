<template>
 <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Add Plantage</h4>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-datepicker v-model="date">
                    <label>Select date</label>
                  </md-datepicker>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>nombre</label>
                    <md-input v-model="nombre" ref="nombre" type="number"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label for="plantes">plante Id</label>
                    <md-select v-model="selectedplante" >
                      <md-option v-for="plante in plantes" :key="plante.id" v-bind:value="plante.id">{{plante.id}}-{{plante.libelle}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label for="zone">Zone Id</label>
                    <md-select v-model="selectedzone" >
                      <md-option v-for="zone in zones" :key="zone.id" v-bind:value="zone.id">{{zone.id}}-{{zone.libelle}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-right">
                  <md-button class="md-raised md-success" v-on:click="onSubmit">Add Zone</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
        <div id="table" class="col-xs-12 table-responsive">
          <datatable :columns="columns" :data="rows"></datatable>
        </div>
        <div>
          <md-table v-model="plantages" table-header-color= "green">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="zone">{{ item.zone.libelle}}</md-table-cell>
              <md-table-cell md-label="plante">{{ item.plante.libelle}}</md-table-cell>
              <md-table-cell md-label="nombre">{{ item.nombre }}</md-table-cell>
              <md-table-cell md-label="date">{{ item.date }}</md-table-cell>
              <md-table-cell md-label="update">
                <md-button class="md-raised md-success" v-on:click="upd(item.id)">Edit Espace</md-button>
              </md-table-cell>
              <md-table-cell md-label="Delete">
                <md-button class="md-raised md-success" v-on:click="del(item.id)">Delete Espace</md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from"axios";
import DatatableFactory  from "vuejs-datatable"
export default {
  name:"plantes",
  data() {
    return {
      selectedplante: '',
      plantes:[],
      zones: [], 
      errors: [],
      date:"",
      selectedzone:'',
      nombre:"",
      plantages:[],
      columns:[ {label:"zone",field:"plantages.zone.libelle"},
        {label:"plante",field:"plantages.plante.libelle"},
        {label:"date",field:"plantages.date" },
        {label:"nombre",field:"plantages.nombre"}],
      rows: window.rows
    }
  },created:function() {
        this.refreshEspaces();
  },methods: {
        refreshEspaces() {
          axios.get("http://localhost:7090/plante/all")
          .then((res)=>{
            this.plantes=res.data;
          }
          );
          axios.get("http://localhost:7090/zone/all")
          .then((res)=>{
            this.zones=res.data;
          }
          );
          axios.get("http://localhost:7090/plantage/all")
            .then((res1)=>{
              this.plantages=res1.data;
              console.log(res1)
            }
          );
          
          
        },
        onSubmit (e) {
          
          
          console.log({ 
            plantagePK:{
              idZone:this.selectedzone,
              idPlante:this.selectedplante
            },
            date:this.date,
            nombre:this.nombre
            });
            axios.post("http://localhost:7090/plantage/save",{ 
               plantagePK:{
              idZone:this.selectedzone,
              idPlante:this.selectedplante
            },
            date:this.date,
            nombre:this.nombre
            })
          .then((res)=>this.refreshEspaces());

          

           e.preventDefault();
            
           
         
        },del(id){
          axios.delete("http://localhost:7090/plantage/delete/"+{})
          .then((res)=>{
            this.refreshEspaces();
          })

        },upd(id){

        },getInfo(e) {
              
                this.photo = e.target.files[0]
              
        }
  }
}
</script>

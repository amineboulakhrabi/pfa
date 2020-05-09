<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Add Plante</h4>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>libelle</label>
                    <md-input v-model="libelle" ref="lib" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Photo</label>
                    <md-file v-model="image" ref="image"  @change="getInfo" accept="image/*" />
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Racine</label>
                    <md-input v-model="racine" ref="racine" type="text"></md-input>
                  </md-field>
                </div>
                 <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label for="typeplante">type plante</label>
                    <md-select v-model="selected" >
                      <md-option v-for="espace in espaces" :key="espace.id" v-bind:value="espace.id">{{espace.id}}-{{espace.libelle}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-right">
                  <md-button class="md-raised md-success" v-on:click="onSubmit">Add Plante</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
        <div>
          <md-table v-model="plantes" table-header-color= "green">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="id">{{ item.id }}</md-table-cell>
              <md-table-cell md-label="libelle">{{ item.libelle }}</md-table-cell>
              <md-table-cell md-label="photo">{{ item.photo }}</md-table-cell>
              <md-table-cell md-label="racine">{{ item.racine }}</md-table-cell>
              <md-table-cell md-label="type plante">{{ item.typeplante.libelle }}</md-table-cell>
              <md-table-cell md-label="update">
                <md-button class="md-raised md-success" v-on:click="upd(item.id)">Edit Plante</md-button>
              </md-table-cell>
              <md-table-cell md-label="Delete">
                <md-button class="md-raised md-success" v-on:click="del(item.id)">Delete Plante</md-button>
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
export default {
  name:"plantes",
  data() {
    return {
      selected: '',
      plantes:[],
      espaces: [], 
      errors: [],
      libelle:"",
      racine:"",
      image:"",
      sole:null,
      sols:[],
      photo:""
    };
  },created:function() {
        this.refreshEspaces();
  }, methods: {
        refreshEspaces() {
          axios.get("http://localhost:7090/plante/all")
          .then((res)=>{
            this.plantes=res.data;
          }
          );
          axios.get("http://localhost:7090/typeplante/all")
          .then((res)=>{
            this.espaces=res.data;
          }
          );
          
        },
        onSubmit (e) {
          
          
          console.log({ 
            libelle:this.libelle,
            photo:this.image,
            racine:this.racine
            });
            axios.post("http://localhost:7090/plante/save",{ 
              libelle:this.libelle,
              photo:this.image,
              racine:this.racine,
              typeplante:{
                id:this.selected
              }
            })
          .then((res)=>this.refreshEspaces());

          

           e.preventDefault();
            
           
         
        },del(id){
          axios.delete("http://localhost:7090/plante/delete/"+id)
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
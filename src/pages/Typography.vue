<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Add Zone</h4>
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
                    <md-file v-model="image" ref="image" @change="onChange" accept="image/*" />
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>superficie</label>
                    <md-input v-model="superficie" ref="superficie" type="number"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label for="espace">Espace</label>
                    <md-select v-model="selected" >
                      <md-option v-for="espace in espaces" :key="espace.id" v-bind:value="espace.id">{{espace.id}}-{{espace.libelle}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label for="sole">Sol</label>
                    <md-select v-model="sole" >
                      <md-option v-for="sol in sols" :key="sol.id" v-bind:value="sol.id">{{sol.id}}-{{sol.libelle}}</md-option>
                    </md-select>
                  </md-field>
                  {{sole}}
                </div>
                <div class="md-layout-item md-size-100 text-right">
                  <md-button class="md-raised md-success" v-on:click="onSubmit">Add Zone</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
        <div>
          <md-table v-model="zones" table-header-color= "green">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="id">{{ item.id }}</md-table-cell>
              <md-table-cell md-label="libelle">{{ item.libelle }}</md-table-cell>
              <md-table-cell md-label="photo"> <img :src="getImgUrl( item.photo )"/> </md-table-cell>
              <md-table-cell md-label="superficie">{{ item.superficie }}</md-table-cell>
              <md-table-cell md-label="espace">{{ item.espaceVert.libelle }}</md-table-cell>
              <md-table-cell md-label="Sol">{{item.typesol.libelle}}</md-table-cell>
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

export default {
  name:"zones",
  data() {
    return {
      selected: '',
      zones:[],
      espaces: [], 
      errors: [],
      libelle:"",
      superficie:"",
      image:null,
      sole:null,
      sols:[],
      photo:null,
    };
  },created:function() {
        this.refreshEspaces();
  }, methods: {
        refreshEspaces() {
          axios.get("http://localhost:7090/espacevert/all")
          .then((res)=>{
            this.espaces=res.data;
          }
          );
          axios.get("http://localhost:7090/zone/all")
          .then((res)=>{
            this.zones=res.data;
          })
          axios.get("http://localhost:7090/type/all")
          .then((res)=>{
            this.sols=res.data;
          })
        },getImgUrl(a){
          return "C:/Users/amine/eclipse-workspace/pfa1/uploads/"+a;
        },onChange(event){
          this.photo=event.target.files[0];
          console.log(this.photo);
        },
        onSubmit (e) {
          let formData = new FormData();
          formData.append("file", this.photo);
          axios.post( 'http://localhost:7090/image', formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          ).then((res)=> console.log((res))
          );
          axios.post('http://localhost:7090/zone/save',{
            libelle:this.libelle,
              photo: this.photo.name ,
              superficie:this.superficie,
              espaceVert:{
                id:this.selected
              },
              typesol:{
                id:this.sole
              }
          }).then((res) => this.refreshEspaces)
          
            console.log({ 
              libelle:this.libelle,
              photo:this.photo.name,
              superficie:this.superficie,
              espaceVert:{
                id:this.selected
              },
              typesol:{
                id:this.sole
              }});
          
           e.preventDefault();
            
           
         
        },del(id){
          axios.delete("http://localhost:7090/zone/delete/"+id)
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
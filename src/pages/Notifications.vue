  <template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Add type de plantes</h4>
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
                    <label>humidite max</label>
                    <md-input v-model="humiditemx" ref="humiditemx" type="number" />
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>humidite min</label>
                    <md-input v-model="humiditemn" ref="humiditemn" type="number"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-right">
                  <md-button class="md-raised md-success" v-on:click="onSubmit">Add type</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
        <div>
          <md-table v-model="typesplantes" table-header-color= "green">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="id">{{ item.id }}</md-table-cell>
              <md-table-cell md-label="libelle">{{ item.libelle }}</md-table-cell>
              <md-table-cell md-label="humidite max">{{ item.humiditeMax }}</md-table-cell>
              <md-table-cell md-label="humidite min">{{ item.humiditeMin }}</md-table-cell>
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
      typesplantes: [], 
      errors: [],
      libelle:"",
      humiditemx:"",
      humiditemn:"",
      sole:null,
      sols:[],
      photo:""
    };
  },created:function() {
        this.refreshEspaces();
  }, methods: {
        refreshEspaces() {
          axios.get("http://localhost:7090/typeplante/all")
          .then((res)=>{
            this.typesplantes=res.data;
          }
          );
          
        },
        onSubmit (e) {
          
          axios.post( 'http://localhost:7090/typeplante/save', {
            libelle:this.$refs.lib.value,
            humiditeMax:this.$refs.humiditemx.value,
            humiditeMin:this.$refs.humiditemn.value

          }
          
          
        ).then((res)=>this.refreshEspaces());
          
          
           e.preventDefault();
            
           
         
        },del(id){
          axios.delete("http://localhost:7090/typeplante/delete/"+id)
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
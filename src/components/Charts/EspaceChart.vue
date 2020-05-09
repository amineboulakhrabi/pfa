<template >
    <div class="col-md-8">
        <line-chart :v-if="loaded"  :chartdata="chartdata" :options="options"></line-chart>
    </div>
</template>
<script>
   import LineChart from "./LineChart";
   import axios from "axios";
   export default{
       components:{
           "line-chart":LineChart
       },
       data(){
           return{
               hor:[],
               verti:[],
               loaded: false,
               chartdata: null,
               options: null
           }
       },async mounted(){
           this.loaded = false
           this.hor=[]
           this.verti=[]
           await axios.get("http://localhost:7090/espacevert/count")
          .then((res)=>{
                Object.keys(res.data).forEach(element => {
                    this.hor.push(element);
                    this.verti.push(res.data[element]);
                    //   console.log(this.hor);
                    //  console.log(this.verti);
                });
                this.loaded=true;
                this.chartdata={
                    labels:this.hor,
                    datasets:[
                        {
                            backgroundColor: '#3498db',
                            borderColor: 'rgba(136,136,136,0.5)',
                            data:this.verti
                        }
                    ]
                };
                this.options ={
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'nombe de zone par espace vert'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            categoryPercentage: 0.5,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                        }]
                    }
                }
            }
        )
    }
}

</script>
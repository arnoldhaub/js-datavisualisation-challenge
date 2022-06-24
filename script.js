//---------------------------------------- FETCH GRAPH - ----------------------------------------------------
// Graphique sous la balise H1.

const graphRemote = document.createElement("div");
graphRemote.innerHTML = "<canvas id='myGraphRemote'></canvas>";
const h1 = document.getElementById("firstHeading");
h1.appendChild(graphRemote);

// CONFIGURATION DU GRAPH

  const graphRemoteData = {
    labels: graphRemoteLabels,
    datasets: [{
      label: 'Live statistic',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
    }]
  };

  const graphRemoteConfig = {
    type: 'line',
    data: graphRemoteData,
    options: {}
  };

  const myGraphRemote = new Chart(
    document.getElementById('myGraphRemote'),
    graphRemoteConfig
  );

// FUNCTION - Méthode FETCH 
  function graphRemoteNewData(chart,label, data) {
   chart.data.labels = label;
   chart.data.datasets.forEach((dataset) => {
       dataset.data = data;
   });
   chart.update();
};

var graphRemoteLabels = [];
function getRemoteData(){
   fetch("https://canvasjs.com/services/data/datapoints.php", {cache: "reload"})
   .then(response=> response.json())
   .then(datapoints => {

       for(x=0; x<datapoints.length; x++){
         graphRemoteLabels[x] = datapoints[x][0];
       }; 
       graphRemoteNewData(myGraphRemote, graphRemoteLabels, datapoints);
   });
};

// Lancement de la fonction + Interval
var intervalData = setInterval(getRemoteData, 3000)




  //---------------------------------------- FIRST TABLE - Insérer un graphique ----------------------------------------------------

   // Code pour insérer le graphique sur la page. 
    const graphCrimesPolice = document.createElement("div");
    graphCrimesPolice.innerHTML = "<canvas id='chartCrimesPolice'></canvas>";
    document.getElementById("table1").before(graphCrimesPolice);
   //  document.getElementById("Crimes_et_d.C3.A9lits_enregistr.C3.A9s_par_les_services_de_police").appendChild(graphCrimesPolice);

    // CONFIGURATION DU GRAPH
      // LABELS - années reprises du tableau
      const graphOneLabels = [];
      for(i=2; i < document.getElementsByTagName("tr")[1].getElementsByTagName("th").length; i++ ){
         graphOneLabels.push(document.getElementsByTagName("tr")[1].getElementsByTagName("th")[i].textContent)
      }

      // DATASETS - Nom pays + data + index
     var GraphOneCountries = []; // Liste des noms de pays
     var GraphOneDataCountries = []; // Data de chaque pays
     var graphPaysData = [];

     for(i = 2; i < document.getElementById("table1").getElementsByTagName("tr").length; i++ ){

        let x = i-2;
        GraphOneCountries[x]= [];
        GraphOneDataCountries[x] = [];
        graphPaysData[x]=[];
         for(j = 0; j < document.getElementById("table1").getElementsByTagName("tr")[i].getElementsByTagName("td").length; j++){
             if(j == 0) {
                // Nom des pays
               GraphOneCountries[x].push(document.getElementById("table1").getElementsByTagName("tr")[i].getElementsByTagName("td")[j].textContent.replace(/[^a-zA-Z ]/g, ""));
             }
             else {
                // Data des dpays
               GraphOneDataCountries[x].push(parseFloat(document.getElementById("table1").getElementsByTagName("tr")[i].getElementsByTagName("td")[j].textContent.replace(",",".")));
             } 
             // Index avec toutes les infos pour graph.
             let color = getRandomColor();
             graphPaysData[x] = {label: GraphOneCountries[x], data: GraphOneDataCountries[x], fill: false, borderColor: color, backgroundColor: color, tension: 0.1};  
         }
     }
     // Générateur de couleurs pour graph.

     function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
      }
 
      
   // GRAPH - SET-UP
   const data = {
      labels: graphOneLabels,
      datasets: graphPaysData
   };
    
   const config = {
       type: 'line',
       data: data,
      };

  const chartCrimesPolice = new Chart(
    document.getElementById('chartCrimesPolice'),
    config
  );

  //---------------------------------------- SECOND TABLE - Insérer un graphique ----------------------------------------------------

   // Code pour insérer le graphique sur la page. 
   const graphHomicide = document.createElement("div");
   graphHomicide.innerHTML = "<canvas id='chartHomicide'></canvas>";
   document.getElementById("table2").before(graphHomicide);

    // CONFIGURATION DU GRAPH
      // LABELS - années reprises du tableau
      const graphHomicideLabels = [];
      for(i=2; i < document.getElementById("table2").getElementsByTagName("tr")[0].getElementsByTagName("th").length; i++ ){
         graphHomicideLabels.push(document.getElementById("table2").getElementsByTagName("tr")[0].getElementsByTagName("th")[i].textContent)
      }


      // DATASETS - Nom pays + data + index
      var graphHomicideCountries = []; // Liste des noms de pays
      var graphHomicideDataCountries = []; // Data de chaque pays
      var graphHomicideData = [];
 
      for(i = 1; i < document.getElementById("table2").getElementsByTagName("tr").length; i++ ){
 
         let x = i-1;
         graphHomicideCountries[x]= [];
         graphHomicideDataCountries[x] = [];
         graphHomicideData[x]=[];
          for(j = 0; j < document.getElementById("table2").getElementsByTagName("tr")[i].getElementsByTagName("td").length; j++){
              if(j == 0) {
                 // Nom des pays
                 graphHomicideCountries[x].push(document.getElementById("table2").getElementsByTagName("tr")[i].getElementsByTagName("td")[j].textContent);
              }
              else {
                 // Data des pays
                 graphHomicideDataCountries[x].push(parseFloat(document.getElementById("table2").getElementsByTagName("tr")[i].getElementsByTagName("td")[j].textContent.replace(",",".")));
              } 
              // Index avec toutes les infos pour graph.
              graphHomicideData[x] = {label: graphHomicideCountries[x], data: graphHomicideDataCountries[x], fill: false, backgroundColor: getRandomColor(),tension: 0.1};  
          }
      }
   
   
   // GRAPH - SET-UP
   const secondTableData = {
      labels: graphHomicideLabels,
      datasets: graphHomicideData
   };
    
   const secondTableConfig = {
      type: 'bar',
      data: secondTableData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };

  const chartHomicide = new Chart(
    document.getElementById('chartHomicide'),
    secondTableConfig
  );
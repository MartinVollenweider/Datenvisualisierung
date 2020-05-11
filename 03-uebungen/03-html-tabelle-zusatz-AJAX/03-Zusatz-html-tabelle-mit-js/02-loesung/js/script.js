/* Eigene Skripte für die Datenvisualisierung */

fetch('extern/AzWocheCH.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
		tabelleFuellen(data);
  })
  .catch(function(error) {
    console.log('Error: ' + error.message);
  });

// Tabelle nach Klasse .chart-table selektieren und in Variable speichern
let tabelle = document.querySelector('.chart-table')

function erstelleTabHead(headData){
	let row = tabelle.insertRow(-1);
	for(let prop in headData){
		let cell = document.createElement("th");
    if(prop == "Männer"){
      cell.innerHTML = prop + ' <img src="./imgs/icon-maennlich.svg" class="icon" />';
    } else if(prop == "Frauen"){
      cell.innerHTML = prop + ' <img src="./imgs/icon-weiblich.svg" class="icon" />';
    }else {
      cell.innerHTML = prop;
    }
		row.appendChild(cell);
	}
}

function reiheHinzufuegen(rowData) {
	let row = tabelle.insertRow(-1);
	for(let prop in rowData){
		let cell = row.insertCell(-1);
		console.log(rowData[prop]);
		if((typeof rowData[prop]) == "string"){
			cell.innerHTML = rowData[prop];
		} else if ((typeof rowData[prop]) == "number"){
			cell.innerHTML = rowData[prop] + "<div class='bar' style='width: " + rowData[prop] / 52.5 * 100 + "%;'></div>"
		}
	}
}

function tabelleFuellen(data){
	for (let i = 0; i < data.length; i++){
		if(i==0){
			erstelleTabHead(data[i]);
		}
		reiheHinzufuegen(data[i]);
	};
}

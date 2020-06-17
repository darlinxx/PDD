let vat = false;
let cena = false;
let id = 0;

$(function() {
    $("#myTable").tablesorter();
});

$(function() {
    $("#myTable").tablesorter({ sortList: [[0,0], [1,0]] });
});

function sprawdzTowarName() {
var formularz_obj=document.getElementById("towar_name");
var t_name = formularz_obj.value;
var blad = document.getElementById("towar_name_blad");

 

 var objRegExp  = /^[a-zA-Z]+$/;
  
if (t_name === "") 
    {   
        blad.innerHTML = "Podaj nazwe towaru"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych=false; 
    }
else if (t_name.length > 10)
    {
        blad.innerHTML = "Zadluga nazwa (max 10 znakow)"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych=true; 
    }
else
    {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = ""; 
        blad_danych=true;
    } 
return blad_danych;       

}

//////////////////////////////////////////////////////////////////////////////////
function sprawdzTowarCode() {
    var formularz_obj = document.getElementById("towar_code");
    var t_code = formularz_obj.value;
    var blad = document.getElementById("towar_code_blad");

    if (t_code === ""){
		blad.innerHTML = "Wprowadź kod towaru w formacie XX-XX";
		formularz_obj.classList.add("is-invalid");
		blad.classList.add("invalid-feedback");
        return false;
	}
	else if(!t_code.match(/^[A-Z0-9]{2}-[A-Z0-9]{2}/)){
		blad.innerHTML = "Wprowadzono błędny format. Wprowadź kod towaru w poprawnym formacie (XX-XX)";
		formularz_obj.classList.add("is-invalid");
		blad.classList.add("invalid-feedback");
		return false;
	}
	else {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");

        blad.innerHTML = "";
        return true;

    }
}

///////////////////////////////////////////////////////////////////////////

function sprawdzTowarCenaNetto() {
    var formularz_obj = document.getElementById("towar_cena_netto");
    var t_cena_netto = formularz_obj.value;
    var blad = document.getElementById("towar_cena_netto_blad");
	
    if (t_cena_netto === ""){
        cena = false;
        blad.innerHTML = "Wprowadzono nieprawidłowe dane. To pole dopuszcza tylko cyfry z kropką.";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        przeliczBrutto();
        return false;
	}
	else if(!t_cena_netto.match(/(?<=^| )\d+(\.\d+)?(?=$| )/)){
		cena = false;
        blad.innerHTML = "Wprowadzono nieprawidłowe dane. To pole dopuszcza tylko cyfry z kropką.";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        przeliczBrutto();
        return false;
	}
    else {
        cena = true;
        formularz_obj.value = parseFloat(formularz_obj.value).toFixed(2);
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = "";
         przeliczBrutto();
        return true;
    }
}

///////////////////////////////////////////////////////////////////
function sprawdzVAT() {
var formularz_obj=document.getElementById("towar_vat");
var t_vat = formularz_obj.value;
var blad = document.getElementById("towar_vat_blad");

 
vat=false;
 
  
if (t_vat === "") 
    {   
        blad.innerHTML = "Podaj wartość VAT"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        przeliczBrutto();
		blad_danych=false; 
		
    }
	
else if (!t_vat.match(/^[0-9]*$/))
    {   
        blad.innerHTML = "Nieprawidłowy format"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        przeliczBrutto();
		blad_danych=false; 
		
    }
else if (t_vat.length > 2)
    {
        blad.innerHTML = "Nieprawidłowa wartość"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        przeliczBrutto();
		blad_danych=true; 
		
    }
else
    {
		vat = true;
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = ""; 
		przeliczBrutto();
        blad_danych=true;
    } 
return blad_danych;       

}

//////////////////////////////////////////////////////////////

function przeliczBrutto()
{
    if (vat && cena)
    {
        var cena_netto_dpb =  parseFloat(document.getElementById("towar_cena_netto").value);
        var vat_dpb =  parseFloat(document.getElementById("towar_vat").value);

        document.getElementById("towar_cena_brutto").value = cena_netto_dpb + (cena_netto_dpb * vat_dpb/100);
    }
    else
    {
        document.getElementById("towar_cena_brutto").value = "";
    }
}

////////////////////////////////////////////////////////////////

function sprawdzKategorie()
{
    var kategorie = document.getElementById("towar_kategorie");
    var wybrana_kategoria = kategorie.options[kategorie.selectedIndex].value;
    var blad = document.getElementById("towar_kategorie_blad");
    if (wybrana_kategoria === "0") {
        blad.classList.add("invalid-feedback");
        kategorie.classList.add("is-invalid");
        blad.innerHTML = "Wybierz kategorię produktu";
        kategorie.classList.remove("is-valid");
        return false;
		
    } else {
        blad.classList.remove("invalid-feedback");
        kategorie.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        kategorie.classList.add("is-valid");

        blad.innerHTML = "";
        return true;
    }
}

///////////////////////////////////////////////////////////////////
function sprawdzOpcje() {
    var total = document.querySelectorAll('input[type="checkbox"]:checked').length;
    var blad = document.getElementById("towar_opcje_blad");
	console.log(total);
    
    if(total < 2)
    {
        blad.classList.remove("valid-feedback");
        blad.classList.add("invalid-feedback");
        blad.classList.add("options-error");
        blad.innerHTML = "Musisz wybrać dwie opcje";
        return false;
    }
	else if(total > 2)
    {
        blad.classList.remove("valid-feedback");
        blad.classList.add("invalid-feedback");
        blad.classList.add("options-error");
        blad.innerHTML = "Musisz wybrać dwie opcje";
        return false;
    }
    else
    {
        blad.classList.remove("invalid-feedback");
        blad.classList.add("valid-feedback");
        blad.innerHTML = "Pico bello";
        return true;
    }
}

////////////////////////////////////////////////////////
function sprawdzCalyFormularz(event) {
	var blad = document.getElementById("submit_blad");
	event.preventDefault();
    var vat = sprawdzVAT();
    var cenaNetto = sprawdzTowarCenaNetto();
    var code = sprawdzTowarCode();
    var name = sprawdzTowarName();
    var opcje = sprawdzOpcje();
    var kategorie = sprawdzKategorie();
	
    if( !(vat) || !(cenaNetto) || !(code) || !(name) || !(kategorie) || !(opcje)  ) {
		console.log("zle");
       	
        return false;
        
    }
	
	if(sprawdzNazwe()) {
		console.log("test sprawdzNazwe");
        var infoSprawdzNazwe = document.getElementById("infoSprawdzNazwe");
        infoSprawdzNazwe.style.display = "";
        setTimeout(function(d){
            infoSprawdzNazwe.style.display = "none";
        }, 5000);
        dodajDoTabeli();
		wyczyscPola();
        
    }
    else{
        powtorka();
    }
    return true;

    
}

///////////////////////////////////////////////////////////
function wyczyscPola()
{
    vat = false;
    cenaNetto = false;
    var name = document.getElementById("towar_name");
    name.value = "";
    name.classList.remove("is-valid");
    var code = document.getElementById("towar_code");
    code.value = "";
    code.classList.remove("is-valid");
    var cenaNetto = document.getElementById("towar_cena_netto");
    cenaNetto.value = "";
    cenaNetto.classList.remove("is-valid");
    var cenaBrutto = document.getElementById("towar_cena_brutto");
    cenaBrutto.value = "";
    cenaBrutto.classList.remove("is-valid");
    var vat = document.getElementById("towar_vat");
    vat.value = "";
    vat.classList.remove("is-valid");
    var checkedBox = document.querySelectorAll('input[type="checkbox"]:checked');
    for(var i = 0; i < checkedBox.length;i++)
    {
        checkedBox[i].checked = false;
    }
    var kategorie = document.getElementById('towar_kategorie');
    kategorie.value = 0;
    document.getElementById('towar_kategorie').classList.remove("is-valid");
    document.getElementById("exampleRadios3").checked = true;
    document.getElementById("id").value = "";
}
///////////////////////////////////////////

function sortowanie()
{
    
    var sortowanie = document.getElementById("sortowanie");
    var wybrane_sortowanie = sortowanie.options[sortowanie.selectedIndex].value;
    if(wybrane_sortowanie === "1"){
        $("#myTable").trigger("sorton", [ [[1,0]] ]);
    }
    else if (wybrane_sortowanie=== "2"){
        $("#myTable").trigger("sorton", [ [[1,1]] ]);
    }
    
    else if(wybrane_sortowanie=== "3"){
        $("#myTable").trigger("sorton", [ [[3,1]] ]);
    }
    else if (wybrane_sortowanie=== "4"){
        $("#myTable").trigger("sorton", [ [[3,0]] ]);
    }
	else if (wybrane_sortowanie=== "5"){
        $("#myTable").trigger("sorton", [ [[8,0]] ]);
    }
    else if (wybrane_sortowanie=== "6"){
        $("#myTable").trigger("sorton", [ [[8,1]] ]);
    }
	else{
        //nothing
    }
        
    
}

//////////////////////////////////////////////////////////


function nastepny() {
    id++;
    return id;
}

function dodajDoTabeli()
{
	console.log("wchodzi do add");
    var optionsElem = document.querySelectorAll('input[type="checkbox"]:checked');
    var options = "";
    for(i = 0;  i  < optionsElem.length; i++)
    {
        options += optionsElem[i].value;
        options += ",";
    }

    options = options.slice(0, -1);
    var row = '';
    if(document.getElementById('id').value !== "")
    {
        var currentId = document.getElementById('id').value;
        var tableIds = document.getElementsByName("tableId");
        var rowFromTable;
        for (var i = 0; i<tableIds.length; i++)
        {
            if(tableIds[i].innerHTML === currentId){
                rowFromTable = tableIds[i];
            }
        }
        rowFromTable.closest('tr').remove();
        console.log("zedytowało");
        var t = $('table');
        t.trigger('update');
        row = '<tr><td name="tableId">' + row.innerHTML + '</td><td name = "table_nazwa">' 
										+ document.getElementById("towar_name").value + '</td><td>'
										+ document.getElementById("towar_code").value + '</td><td>' 
										+ document.getElementById("towar_cena_netto").value + '</td><td>' 
										+ document.getElementById("towar_vat").value
										+ '</td><td>' + document.getElementById("towar_cena_brutto").value + '</td><td>' 
										+ document.getElementById('towar_kategorie').value + '</td><td>' 
										+ options + '</td><td> ' 
										+ $('input[name=exampleRadios]:checked').val() +
										'</td><td>image</td><td><button type="button" class="edytuj">Edytuj element</button></td><td>' +
																'<button type="button" class="usun" >Usuń element</button></td>' +
																'<td><button type = "button" class="dodaj">Dodaj do koszyka</button></td></tr>';
    }
    else {
        var idToTable = nastepny();
       row = '<tr><td name="tableId">' + idToTable + '</td><td name = "table_nazwa">' 
									   + document.getElementById("towar_name").value + '</td><td>' 
									   + document.getElementById("towar_code").value + '</td><td>' 
									   + document.getElementById("towar_cena_netto").value 
									   + '</td><td>' + document.getElementById("towar_vat").value + '</td><td>' 
									   + document.getElementById("towar_cena_brutto").value + '</td><td>' 
									   + document.getElementById('towar_kategorie').value + '</td><td>' 
									   + options + '</td><td> ' 
									   + $('input[name=exampleRadios]:checked').val() +
										'</td><td>image</td><td><button type="button" class="edytuj">Edytuj element</button></td><td>' +
																'<button type="button" class="usun" >Usuń element</button></td>' +
																'<td><button type = "button" class="dodaj">Dodaj do koszyka</button></td></tr>';
	}	
														
    var $row = $(row);
        // resort table using the current sort; set to false to prevent resort, otherwise
        // any other value in resort will automatically trigger the table resort.
    var resort = true;
    $('#myTable')
        .find('tbody').append($row)
        .trigger('addRows', [$row, resort]);
    return false;
}

function sprawdzNazwe(){
	if(document.getElementById("id").value !== "")
    {
         return true;
    }

    var sprawdzNazwe = document.getElementById("towar_name");
    var tabelaDoSprawdzNazwe = document.getElementsByName("table_nazwa");
    for (var i = 0; i<tabelaDoSprawdzNazwe.length; i++)
    {
        if(tabelaDoSprawdzNazwe[i].innerHTML === sprawdzNazwe.value){
            return false;
        }
    }
    return true;
}

function powtorka(){
    var powtorka = document.getElementById("powtorka-blad");
    powtorka.style.display = "";
    setTimeout(function(d){
        powtorka.style.display = "none";
    }, 5000);
	console.log("TEST jest powtorka");
   
}

function uzupelnijTabelki(values) {
    vat = true;
    cena = true;
    var id = document.getElementById('id');
    id.value = values[0];
    var name = document.getElementById("towar_name");
    name.value = values[1];
    var code = document.getElementById("towar_code");
    code.value = values[2];
    var cenaNetto = document.getElementById("towar_cena_netto");
    cenaNetto.value = values[3];
    var cenaBrutto = document.getElementById("towar_cena_brutto");
    cenaBrutto.value = values[5];
    var vat = document.getElementById("towar_vat");
    vat.value = values[4];
    var kategorie = document.getElementById('towar_kategorie');
    kategorie.value = values[6];
    var checkedBox = document.getElementsByName('opcja');
    for(var i = 0; i < checkedBox.length; i++)
    {
        checkedBox[i].checked = values[7].includes(checkedBox[i].value);
    }
    var ocena = document.getElementsByName("exampleRadios");
    for(var i = 0; i < ocena.length; i++)
    {
        ocena[i].checked = values[8].includes(ocena[i].value);
    }
    
}

//////////////////////////////////////////////////////

$(function() {
	
	 $('#myTable').delegate('button.edytuj', 'click', function () {
        var element = $(this).closest('tr').children();

        var values = [];
        for (var i=0; i < element.length; i++)
        {
            values.push(element[i].innerHTML);
        }
        uzupelnijTabelki(values);
    });
    $('#myTable').delegate('button.usun', 'click', function () {
        var t = $('table');
        $(this).closest('tr').remove();
        t.trigger('update');
        return false;
    });

  

    $('#myTable').delegate('button.dodaj', 'click', function () {
     
       var element = $(this).closest('tr').children();

       var elementNazwa = element[1].innerHTML;
       var elementCena = element[3].innerHTML;
       var przedmiotyDoTabeli = localStorage.getItem("przedmiotyDoTabeli") === null ? [] : JSON.parse(localStorage.getItem("przedmiotyDoTabeli"));
       var jedenPrzedmiot = {
           "towar_name" : elementNazwa,
           "towar_cena_brutto" : elementCena
       };
      
       przedmiotyDoTabeli.push(jedenPrzedmiot);
       localStorage.setItem("przedmiotyDoTabeli", JSON.stringify(przedmiotyDoTabeli));
	   console.log("jest w localStorage");
		
        
    });

    
});




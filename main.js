
 // variable global
 const container = document.getElementById("containerCards"); 
 //console.log(containerCards)
let pageNumber = 1

let totalPages=0

//const de los filtros

const btnAll = document.getElementById("all")
const btnFemale= document.getElementById("female")
const btnMale=document.getElementById("male")
const btnGenderless= document.getElementById("genderless")
const btnOtros= document.getElementById("unknown")

let valueParam =""
let filterParam =""
 //traje la data de personajes
const getCharacters = (pageNumber) =>{ 
  container.innerHTML=""
fetch (`https://rickandmortyapi.com/api/character/?page=${pageNumber}`) //antes puse el http hasta character
.then (res => res.json())
.then ((data) => {
    charactersCard(data)
 totalPages = data.info.pages
})//despus sacar console.log y poner la funcion que describa la accion por eje render character

}

getCharacters(pageNumber); //termina la primera funcion


//tarjeta con personajes
const charactersCard = (data) => { //hice un foreach
//console.log(data)  //trae array de los personajes
 container.innerHTML = "";
data.results.forEach(character=> { //hacer un foreach array llamada results
   //console.log(character) 
  containerCards.innerHTML +=
   `<div class="character-card">
                <img src="${character.image}" alt="" class="img-card">
    <div class="descripcion-card">
                   <h2 class="name">${character.name}</h2>
                   <p class="info">${character.gender}</p>
                <button class="btn-detalle" onclick = verDescrip("${character.url}")>Ver Mas</button>

                </div>
            </div>
       `
});
}

//boton de volver
const verDescrip = (characterUrl) =>{
    containerCards.innerHTML=""
    fetch(characterUrl)
    .then (res => res.json())
    .then ((character) => {
    containerCards.innerHTML=
    `<div class="character-cardbig">
    <img src="${character.image}" alt="" class="img-card">
<div class="descripcion-card" id="cardbig">
       <h2 class="name">${character.name}</h2>
       <div class="parrafos">
       <p class="infobig"><b>Gender: </b>${character.gender}</p>
        <p class="species"><b>Species: </b>${character.species}</p>
        <p class="status"><b>Status: </b>${character.status}</p>
       <p class="origin"><b>Origin: </b>${character.origin.name}</p>
    <p class="location"><b>Locacion: </b>${character.location.name}</p>
    </div>
    <button class="btn-detalle" onclick = getCharacters("${character.url}")>Atras</button> 

    </div>`
})
}

//paginacion listoo!!
//btnprev
const btnPrev = document.getElementById("prev");
btnPrev.addEventListener("click", () => {
   if (pageNumber <=1){
   btnPrev.setAttribute("disabled",true)
        pageNumber--;
    }else if (pageNumber >1 && pageNumber < totalPages) {
        btnNext.removeAttribute("disabled", true)
        pageNumber--;
    }

    else {
        btnNext.setAttribute("disabled", true)
        pageNumber--;
    } 

    getCharacters(pageNumber)
});

//btnnext LISTO!!!
const btnNext = document.getElementById("next");
btnNext.addEventListener("click", () => {
     if (pageNumber <=1){
        pageNumber++;
    } else if (pageNumber >=1 && pageNumber < totalPages) {
        btnPrev.removeAttribute("disabled", false)
        pageNumber++;
    }
    
    else {
        btnNext.setAttribute("disabled", true)
    } 
    getCharacters(pageNumber)

});
  
//btnprimerapagina

const btnFirst = document.getElementById("first");
btnFirst.addEventListener("click", () => {

    getCharacters(1)
})

//btnUltimapagina

const btnLast = document.getElementById("last");
btnLast.addEventListener("click", () => {
    getCharacters(totalPages);
})

    





//filtros
const filterCharacters= ( filterParam, valueParam) => {
console.log(filterParam, valueParam)
   fetch(`https://rickandmortyapi.com/api/character/?${filterParam}=${valueParam}`) 
   .then (res=>res.json())
   .then ((data)=>charactersCard(data))
    


   
}
//boton todos
btnAll.addEventListener("click", () => {
    getCharacters()
    
  });

//boton mujer

btnFemale.addEventListener("click", () =>{

    filterCharacters("gender","female")
   
   
});

//boton hombre

btnMale.addEventListener("click", () => {
    filterCharacters("gender", "male")

});

//boton genderless

btnGenderless.addEventListener("click", () => {
    filterCharacters("gender", "genderless")

});

//boton unkown

btnOtros.addEventListener("click",() => {
    filterCharacters("gender","unknown")
});
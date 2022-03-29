window.onload = function(){
    /* une fonction qui prend en paramètre un nombre et 
    affiche dans le catalogue le film associé à ce nombre
        
    */
for (let i = 0; i < filmData.length; i++) {
     createFilm(i)
}
function createFilm(number){
    var someFilm = filmData[number];

    // creation d'un film
    var film = document.createElement("div");
    film.className = "film";
    film.id = number+"-film";

    // Creation de l'image
    var image = document.createElement("img");
    image.src = someFilm.image;
    image.alt = someFilm.title;

    //creation du titre du film

    var titre = document.createElement("h3");
    titre.innerHTML = someFilm.title;

    film.appendChild(image);
    film.appendChild(titre);

    document.getElementById("films").appendChild(film);
}

var input = document.getElementsByTagName("input");
var films = document.getElementById("films");
var selection =document.getElementById("selection");
input[0].addEventListener("keyup", recherche);
input[1].addEventListener("mouseup", checkbox);
films.addEventListener("mouseover", survoleFilm);
films.addEventListener("mouseout", finSurvole);
films.addEventListener("click", selectionFilm);
selection.addEventListener("click", clickSelection);

function recherche(event){
    var inputValue = event.target.value;
    inputValue = inputValue.toLowerCase();
    console.log(inputValue);

        // input n'est pas vide
        for (var i = 0; i < filmData.length; i++) {
            var titre = filmData[i].title;
            titre = titre.toLowerCase();
            var film = document.getElementById(i+"-film");

            if(titre.includes(inputValue) == false){
                film.style.display = "none";
            }else{
                film.style.display = "inline-block";
            }
            
        }
    
}

function checkbox(event){
    var details = document.getElementById("details");
    if(!event.target.checked){
        details.style.display = "none";
    }else{
        details.style.display = "block";
    }
}

function survoleFilm(event){
    var elementSurvole = event.target.parentNode;
    var identfiantFilm = elementSurvole.id;
    var position;
    if(identfiantFilm == "catalog"){
        return;
    }else if(identfiantFilm.length == 6){
        position = identfiantFilm[0];
    }else if(identfiantFilm.length == 6){
        position = identfiantFilm[0]+identfiantFilm[1];
    }else{
        return;
    }

    var descriptionFilm = filmData[position].text;
    document.getElementById("details").innerHTML = descriptionFilm;
}

function finSurvole(event){
    document.getElementById("details").innerHTML = "";
}

function selectionFilm(event){
    var film = event.target.parentNode;
    var select1 = document.getElementById("selection1");
    var select2 = document.getElementById("selection2");
    film.addEventListener("mouseover", survoleFilm);
    film.addEventListener("mouseout", finSurvole);

    var select1Child = select1.childNodes;
    var select2Child = select2.childNodes;

    if(select1Child.length == 1){
        // partie selection1 est vide
        select1.insertBefore(film, select1Child[0]);
    }else if(select2Child.length == 1){
        // partie selection2 est vide
        select2.insertBefore(film, select2Child[0]);
    }else {
        alert("Désolé vous avez déjà choisi deux films !")
    }
    // console.log(select2Child);
}

function clickSelection(event){
    var elementClickee = event.target;
    var film = elementClickee.parentNode;

    var select = film.parentNode;
    var selectChild = select.childNodes;

    if(selectChild[0].className == "film"){
        var copyFilm = selectChild[0];
        select.removeChild(copyFilm);
        document.getElementById("films").appendChild(copyFilm);
    }
    // console.log(selectChild);
}


}
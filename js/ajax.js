//Paso 1 Crear Instancia
//Paso 2 Leer eventos
//Paso 3 Abrir el endpoint con el metodo que se requiera
//Paso 4 Enviar
(() => {
    const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();

    
    xhr.addEventListener("readystatechange", e => {
        //Cuando el readystate es 4 (completado) porque ya puedo manipular el DOM de la información que trajo el servidor
        //Entonces cuando no sea 4 no retornes nada
        if (xhr.readyState !== 4) {
            return;
        }
        console.log(xhr);
        
        //De 200 a 299 son status de peticiones exitosas
        if (xhr.status >= 200 && xhr.status < 300) {
            //console.log("Éxito");
            //console.log(xhr.responseText);
                //Para convertir el JSON a objeto JS
            let json= JSON.parse(xhr.responseText);
            //console.log(json);
            
            json.forEach(e => {
                //console.log(e);
                const $li = document.createElement("li");
                $li.innerHTML = `ID: ${e.id} Nombre: ${e.name} Phone: ${e.phone} City: ${e.address.city}`;
                $fragment.appendChild($li);
            });
            $xhr.appendChild($fragment);
        } else{
            console.log("Error");
            //En el statusText indican el error pero si no lo indican imprimirá un "Ocurrió un error"
            let message = xhr.statusText || "Ocurrió un error";
            $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
        }
    });
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhr.send();
})();


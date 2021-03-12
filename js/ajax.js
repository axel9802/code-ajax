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

//Ajax con Fetch -> Fetch trabaja co Promesas
(() => {
    $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();

    //Método por defecto para Fetch es GET
    fetch("https://jsonplaceholder.typicode.com/users")
        /*.then(response => {
        console.log(response);
        //Validando un error con FecthAPI y objeto Promise. Si response.ok es true sino ...
        return response.ok ? response.json() : Promise.reject(response);     //.json Tambien hay .text y .blob. Elegir depende a que formato recibo de la API   
        })*/
        //Transformando respuesta de Fetch a un json
        .then((response) => response.ok ? response.json() : Promise.reject(response))
        //Este then va recibir la respuesta del then de arriba de arriba
        .then(json => {
            // console.log(json);

            json.forEach(e => {
                //console.log(e);
                const $li = document.createElement("li");
                $li.innerHTML = `ID: ${e.id} Nombre: ${e.name} Phone: ${e.phone} City: ${e.address.city}`;
                $fragment.appendChild($li);
            });
            $fetch.appendChild($fragment);
        })
        .catch(error => {
            console.log(error);
            //En el statusText indican el error pero si no lo indican imprimirá un "Ocurrió un error"
            let message = error.statusText || "Ocurrió un error";
            $fetch.innerHTML = `Error ${error.status}: ${message}`;
        })
        .finally(() => 
            console.log("Esto se ejecutará independientemente del resultado de la Promesa Fetch")
        ); 
})();

//Ajax con API Fetch + Async-Await
(() => {
    $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

    async function getData(){
        try {
            //await -> Esperar Antes de ejecutar la siguiente linea de codigo
            let resp = await fetch("https://jsonplaceholder.typicode.com/users"),     //Método por defecto para Fetch es GET
                json = await resp.json(); //Convertir la respuesta a json. await -> Esperar a convertirlo antes de ejecutar la siguiente linea
           console.log(resp, json);

           //THROW es como un return que envía el flujo de la programación al catch
            //if (!resp.ok) throw new Error("gaaaaa"); // new Error solo recibe strings
            if (!resp.ok) throw {status: resp.status, statusText: resp.statusText}; //lanzo un objeto con status y statusText al catch. THROW SIEMPRE LANZA AL CATCH


           json.forEach(e => {
            //console.log(e);
            const $li = document.createElement("li");
            $li.innerHTML = `ID: ${e.id} Nombre: ${e.name} Phone: ${e.phone} City: ${e.address.city}`;
            $fragment.appendChild($li);
        });
        $fetchAsync.appendChild($fragment);
        } catch (error) {
            console.log(error)
            let message = error.statusText || "Ocurrió un error";
            $fetchAsync.innerHTML = `Error ${error.status}: ${message}`;
        } finally {
            console.log("Esto se ejecutará independientemente del try-catch")
        }
    }

    getData();
})();
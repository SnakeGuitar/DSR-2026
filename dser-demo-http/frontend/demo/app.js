const hostname = "localhost";
/**
 * Agregamos el evento click al botón fetchData del documento HTML
 */
document.getElementById('fetchData').addEventListener('click', ()=> {
    const etag = localStorage.getItem('etag');
    const lastModified = localStorage.getItem('lastModified');
    
    fetch(`http://${hostname}:3000/data`, {
        method: 'GET',
        headers: { etag, lastModified,
            'If-None-Match': etag,
            'If-Modified-Since': lastModified
        }
    })
    .then(response => {
        if (response.status === 304) {
            // Los datos no han cambiado
            console.log('Data is cached, not modified.');
            return Promise.resolve(null);
        } else {
            // Los datos han cambiado o es la primera vez
            return response.json().then(data => {
                // Guardar el nuevo ETag
                const newEtag = response.headers.get('ETag');
                const newLastModified = response.headers.get('Last-Modified');
                if (newLastModified) {
                    localStorage.setItem('lastModified', newLastModified);
                    console.log(newLastModified);
                }
                if (newEtag) {
                    localStorage.setItem('etag', newEtag);
                    console.log(newEtag);
                }
                return data;
            });
        }
    })
    .then(data => {
        if (data) {
            // Mostrar los datos actualizados
            const dataContainer = document.getElementById('dataContainer');
            dataContainer.innerHTML = `
                <p>${data.message}</p>
            `;
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
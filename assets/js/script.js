document.addEventListener("DOMContentLoaded", function() {
    fetch('https://beauty-xabz.onrender.com/CRUDRepo/ConsultarPersonas')
      .then(response => response.json())
      .then(data => mostrarData(data))
      .catch(error => console.log(error));
  
    function mostrarData(data) {
      let body = "";
      for (var i = 0; i < data.length; i++) {
        body += `<tr><td>${data[i].id}</td><td>${data[i].nombre}</td><td>${data[i].edad}</td></tr>`;
      }
      document.getElementById('data').innerHTML = body;
    }
  });

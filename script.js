document.getElementById('fileUpload').addEventListener('change', processFile);

function processFile(event) {
  const file = event.target.files[0];
  if (!file) {
    alert('Por favor, seleccione un archivo.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const matrix = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

    calcularCostos(matrix);
  };
  reader.onerror = function() {
    alert('No se pudo leer el archivo. Intente nuevamente.');
  };
  reader.readAsArrayBuffer(file);
}

function calcularCostos(matrix) {
  try {
    const tarifas = matrix.slice(1).map(row => row.slice(1).map(cell => (cell === '' || cell === 'n/a' || isNaN(cell)) ? Infinity : parseInt(cell)));
    const n = tarifas.length;
    
    const { costo: costoMinimo, ruta: rutaMinima } = costoMinimoViaje(tarifas, n);
    const { costo: costoVoraz, ruta: rutaVoraz } = costoVorazViaje(tarifas, n);
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <p>Costo mínimo usando Programación Dinámica: ${costoMinimo}</p>
      <p>Ruta usando Programación Dinámica: ${rutaMinima.join(' -> ')}</p>
      <p>Costo usando Algoritmo Voraz: ${costoVoraz}</p>
      <p>Ruta usando Algoritmo Voraz: ${rutaVoraz.join(' -> ')}</p>
    `;
  } catch (error) {
    alert('Ocurrió un error al procesar los datos. Verifique el archivo e intente nuevamente.');
    console.error(error);
  }
}
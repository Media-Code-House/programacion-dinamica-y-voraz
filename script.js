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
function costoMinimoViaje(tarifas, n) {
  const dp = Array(n).fill(Infinity);
  const prev = Array(n).fill(-1);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (dp[j] > dp[i] + tarifas[i][j]) {
        dp[j] = dp[i] + tarifas[i][j];
        prev[j] = i;
      }
    }
  }

  let ruta = [];
  for (let at = n - 1; at !== -1; at = prev[at]) {
    ruta.push(at);
  }
  ruta.reverse();

  return { costo: dp[n - 1], ruta };
}

function costoVorazViaje(tarifas, n) {
  let costo = 0;
  let ciudad = 0;
  let ruta = [ciudad];

  while (ciudad < n - 1) {
    let minCosto = Infinity;
    let siguienteCiudad = ciudad;

    for (let i = ciudad + 1; i < n; i++) {
      if (tarifas[ciudad][i] < minCosto) {
        minCosto = tarifas[ciudad][i];
        siguienteCiudad = i;
      }
    }

    costo += minCosto;
    ciudad = siguienteCiudad;
    ruta.push(ciudad);
  }

  return { costo, ruta };
}
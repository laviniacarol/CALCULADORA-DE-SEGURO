document.getElementById('seguro-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const s1 = parseFloat(this.salario1.value);
  const s2 = parseFloat(this.salario2.value);
  const s3 = parseFloat(this.salario3.value);
  const entrada = new Date(this.entrada.value);
  const saida = new Date(this.saida.value);
  const outrosMeses = parseInt(this.outros_meses.value) || 0;
  const vezes = parseInt(this.vezes.value);

  const media = (s1 + s2 + s3) / 3;
  let valorParcela = 0;

  if (media <= 2138.76) {
    valorParcela = media * 0.8;
  } else if (media <= 3564.96) {
    valorParcela = 1711.01 + ((media - 2138.76) * 0.5);
  } else {
    valorParcela = 2424.11;
  }

  valorParcela = Math.max(valorParcela, 1518.00);

  const diffTime = Math.abs(saida - entrada);
  const mesesUltimaEmpresa = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
  const mesesTotais = mesesUltimaEmpresa + outrosMeses;

  let parcelas = 0;

  if (vezes === 1) {
    if (mesesTotais >= 12 && mesesTotais <= 23) {
      parcelas = 4;
    } else if (mesesTotais >= 24) {
      parcelas = 5;
    }
  } else if (vezes === 2) {
    if (mesesTotais >= 9 && mesesTotais <= 11) {
      parcelas = 3;
    } else if (mesesTotais >= 12 && mesesTotais <= 23) {
      parcelas = 4;
    } else if (mesesTotais >= 24) {
      parcelas = 5;
    }
  } else {
    if (mesesTotais >= 6 && mesesTotais <= 11) {
      parcelas = 3;
    } else if (mesesTotais >= 12 && mesesTotais <= 23) {
      parcelas = 4;
    } else if (mesesTotais >= 24) {
      parcelas = 5;
    }
  }

  const resultadoDiv = document.getElementById('resultado');

  if (parcelas === 0) {
    resultadoDiv.innerHTML = `<p style="color: red;">Você não tem direito ao seguro-desemprego com os dados informados.</p>`;
    return;
  }

  resultadoDiv.innerHTML = `
    <p><strong>VALOR DA PARCELA:</strong> R$ ${valorParcela.toFixed(2)}</p>
    <p><strong>QUANTIDADE DE PARCELAS:</strong> ${parcelas}</p>
    <p><strong>VALOR TOTAL A RECEBER:</strong> R$ ${(valorParcela * parcelas).toFixed(2)}</p>
  `;
});



function calcularErro(indicado, amostra) {
  return ((amostra - indicado) / indicado) * 100;
}

function processar() {
  const f = document.getElementById("relatorio");

  let aprovado = true;

  // pH 7
  if (f.amo7.value) {
    const erro7 = calcularErro(Number(f.ind7.value), Number(f.amo7.value));
    f.erro7.value = erro7.toFixed(2) + "%";
    f.status7.value = Math.abs(erro7) <= 2 ? "OK" : "FORA";
    if (Math.abs(erro7) > 2) aprovado = false;
  }

  // pH 10
  if (f.amo10.value) {
    const erro10 = calcularErro(Number(f.ind10.value), Number(f.amo10.value));
    f.erro10.value = erro10.toFixed(2) + "%";
    f.status10.value = Math.abs(erro10) <= 2 ? "OK" : "FORA";
    if (Math.abs(erro10) > 2) aprovado = false;
  }

  const resultado = document.getElementById("resultadoFinal");

  if (aprovado) {
    resultado.innerText = "✅ RESULTADO FINAL: APROVADO (±2%)";
    resultado.style.color = "green";
  } else {
    resultado.innerText = "❌ RESULTADO FINAL: REPROVADO (fora da tolerância)";
    resultado.style.color = "red";
  }
}

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");
  const f = document.getElementById("relatorio");

  pdf.setFontSize(11);
  pdf.text("RELATÓRIO DE VERIFICAÇÃO E CALIBRAÇÃO DE ANALISADORES DE pH", 105, 12, { align: "center" });

  pdf.setFontSize(9);
  pdf.line(10, 15, 200, 15);

  pdf.text(`TAG: ${f.tag.value}`, 10, 22);
  pdf.text(`O.S.: ${f.os.value}`, 10, 28);
  pdf.text(`Data: ${f.data.value}`, 150, 28);

  pdf.rect(10, 32, 190, 20);
  pdf.text("VERIFICAÇÃO pH 7,00", 12, 38);
  pdf.text(`Indicado: ${f.ind7.value}`, 12, 45);
  pdf.text(`Amostra: ${f.amo7.value}`, 80, 45);
  pdf.text(`Erro: ${f.erro7.value}`, 140, 45);

  pdf.rect(10, 55, 190, 20);
  pdf.text("VERIFICAÇÃO pH 10,00", 12, 61);
  pdf.text(`Indicado: ${f.ind10.value}`, 12, 68);
  pdf.text(`Amostra: ${f.amo10.value}`, 80, 68);
  pdf.text(`Erro: ${f.erro10.value}`, 140, 68);

  pdf.setFontSize(11);
  const resultado = document.getElementById("resultadoFinal").innerText;

  if (resultado.includes("APROVADO")) {
    pdf.setTextColor(0, 140, 0);
  } else {
    pdf.setTextColor(200, 0, 0);
  }

  pdf.rect(10, 82, 190, 12);
  pdf.text(resultado, 105, 90, { align: "center" });
  pdf.setTextColor(0);

  pdf.setFontSize(8);
  pdf.text("Tolerância: ±2% | Incerteza: ±1% | Documento para uso interno", 105, 285, { align: "center" });

  pdf.save("Relatorio_Calibracao_pH.pdf");
}

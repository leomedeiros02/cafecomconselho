let frases = [];

fetch("phrases.json")
  .then(response => response.json())
  .then(data => {
    frases = data;
    mostrarFrase();
  });

function mostrarFrase() {
  const hoje = new Date();

  const inicioAno = new Date(hoje.getFullYear(), 0, 0);
  const diff = hoje - inicioAno;
  const umDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(diff / umDia);

  const index = diaDoAno % frases.length;
  const fraseCompleta = frases[index];

  const partes = fraseCompleta.split(" — ");

  document.getElementById("frase").innerText = partes[0];
  document.getElementById("autor").innerText = partes[1] || "";
function configurarCompartilhamento(frase, autor) {
  const texto = `${frase} — ${autor}`;
  const url = "https://leomedeiros02.github.io/cafecomconselho/";

  document.getElementById("whatsapp").href =
    `https://wa.me/?text=${encodeURIComponent(texto + " " + url)}`;

  document.getElementById("telegram").href =
    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`;

  document.getElementById("facebook").href =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  document.getElementById("instagram").onclick = () => {
    alert("Para Instagram, salve a imagem e poste manualmente 👊");
  };

  document.getElementById("salvar").onclick = () => {
    alert("Vamos ativar salvar imagem no próximo passo 👊");
  };
}



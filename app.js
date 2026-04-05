let frases = [];

fetch("phrases.json")
  .then(res => res.json())
  .then(data => {
    frases = data;
    mostrarFrase();
  });

function mostrarFrase() {
  const hoje = new Date();
  const inicioAno = new Date(hoje.getFullYear(), 0, 0);
  const diff = hoje - inicioAno;
  const dia = Math.floor(diff / (1000 * 60 * 60 * 24));

  const fraseCompleta = frases[dia % frases.length];

  const partes = fraseCompleta.split(" — ");

  const frase = partes[0];
  const autor = partes[1];

  document.getElementById("frase").innerText = frase;
  document.getElementById("autor").innerText = autor;

  configurarCompartilhamento(frase, autor);
}

function configurarCompartilhamento(frase, autor) {
  const texto = `${frase} — ${autor}`;
  const url = "https://leomedeiros02.github.io/cafecomconselho/";

  const textoFinal = encodeURIComponent(texto + " " + url);

  document.getElementById("whatsapp").href =
    `https://api.whatsapp.com/send?text=${textoFinal}`;

  document.getElementById("telegram").href =
    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`;

  document.getElementById("facebook").href =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  document.getElementById("salvar").onclick = () => {

    const conteudo = document.getElementById("conteudo");
    const share = document.querySelector(".share");

    share.style.display = "none";

    html2canvas(conteudo).then(canvas => {
      const link = document.createElement("a");
      link.download = "conselho.png";
      link.href = canvas.toDataURL();
      link.click();

      share.style.display = "block";
    });
  };
}

document.addEventListener("DOMContentLoaded", function () {

  fetch("phrases.json")
    .then(res => res.json())
    .then(frases => {

      const hoje = new Date();
      const inicioAno = new Date(hoje.getFullYear(), 0, 0);
      const diff = hoje - inicioAno;
      const dia = Math.floor(diff / (1000 * 60 * 60 * 24));

      const fraseCompleta = frases[dia % frases.length];

      const partes = fraseCompleta.split(" — ");

      const frase = partes[0];
      const autor = partes[1] || "";

      document.getElementById("frase").innerText = frase;
      document.getElementById("autor").innerText = autor;

      configurarCompartilhamento(frase, autor);

    })
    .catch(() => {
      document.getElementById("frase").innerText = "Erro ao carregar frases";
    });

});

function configurarCompartilhamento(frase, autor) {

  const texto = `${frase} — ${autor}`;
  const url = window.location.href;

  const textoFinal = encodeURIComponent(texto + " " + url);

  document.getElementById("whatsapp").onclick = () => {
    window.open(`https://api.whatsapp.com/send?text=${textoFinal}`, "_blank");
  };

  document.getElementById("telegram").onclick = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`, "_blank");
  };

  document.getElementById("facebook").onclick = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
  };

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

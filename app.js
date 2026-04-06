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

  document.getElementById("salvar").onclick = async () => {

  const conteudo = document.getElementById("conteudo");
  const share = document.querySelector(".share");

  share.style.display = "none";

  const canvas = await html2canvas(conteudo, {
    backgroundColor: "#000",
    scale: 2
  });

  share.style.display = "block";

  canvas.toBlob(async (blob) => {

    const file = new File([blob], "conselho.png", { type: "image/png" });

    // Tenta abrir o menu de compartilhamento do celular
    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Conselho do dia"
      });
    } else {
      // fallback (salvar imagem)
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "conselho.png";
      link.click();
    }

  });

};
}

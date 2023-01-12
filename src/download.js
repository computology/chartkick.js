function addDownloadButton(chart) {
  const element = chart.element;
  const link = document.createElement("a");

  let download = chart.options.download;
  if (download === true) {
    download = {};
  } else if (typeof download === "string") {
    download = {filename: download};
  }
  link.download = download.filename || "chart.png"; // https://caniuse.com/download

  link.style.position = "absolute";
  link.style.top = "20px";
  link.style.right = "20px";
  link.style.zIndex = 1000;
  link.style.lineHeight = "20px";
  link.target = "_blank"; // for safari
  const image = document.createElement("img");
  image.alt = "Download";
  image.style.border = "none";
  // icon from font-awesome
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path fill="#CCCCCC" d="M344 240h-56L287.1 152c0-13.25-10.75-24-24-24h-16C234.7 128 223.1 138.8 223.1 152L224 240h-56c-9.531 0-18.16 5.656-22 14.38C142.2 263.1 143.9 273.3 150.4 280.3l88.75 96C243.7 381.2 250.1 384 256.8 384c7.781-.3125 13.25-2.875 17.75-7.844l87.25-96c6.406-7.031 8.031-17.19 4.188-25.88S353.5 240 344 240zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z"/></svg>`;
  image.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  image.style.width = "20px";
  image.style.height = "20px";
  link.appendChild(image);
  element.style.position = "relative";

  chart.__downloadAttached = true;

  // mouseenter
  chart.__enterEvent = element.addEventListener("mouseover", function (e) {
    const related = e.relatedTarget;
    // check download option again to ensure it wasn't changed
    if ((!related || (related !== this && !this.contains(related))) && chart.options.download) {
      link.href = chart.toImage(download);
      element.appendChild(link);
    }
  });

  // mouseleave
  chart.__leaveEvent = element.addEventListener("mouseout", function (e) {
    const related = e.relatedTarget;
    if (!related || (related !== this && !this.contains(related))) {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    }
  });
}

export { addDownloadButton };

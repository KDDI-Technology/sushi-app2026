// titleimageloader.mjs
// sushi app title imageloader
// (C)2026 by KDDI Technology
// Programmed by H.Kodama (D.F.Mac.@TripArts Music)

const imageUrls = [
  "/img/sushi/01.png",
  "/img/sushi/02.png",
  "/img/sushi/03.png",
  "/img/sushi/04.png",
  "/img/sushi/05.png",
  "/img/sushi/06.png",
  "/img/sushi/07.png",
  "/img/sushi/08.png",
  "/img/sushi/09.png",
  "/img/sushi/10.png",
];

class titleImageLoader {
  constructor(dom) {
    this.dom = dom;
    this.status = "unload";
    this.image = null;
    this.src = null;
  }
  load(index) {
    return new Promise((resolve) => {
      this.status = "loading";
      this.image = new Image();
      if (index == undefined) {
        index = Math.floor(Math.random() * imageUrls.length);
      }
      console.log("bgImageLoader.load() index=" + index);
      this.src = imageUrls[index];
      this.image.onload = (e) => {
        this.dom.style.backgroundImage = "url(" + this.src + ")";
        this.status = "loaded";
        resolve();
      };
      this.image.src = this.src;
    });
  }
}

export default titleImageLoader;

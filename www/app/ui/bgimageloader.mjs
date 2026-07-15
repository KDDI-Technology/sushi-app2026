// bgimageloader.mjs
// sushi app bg imageloader
// (C)2026 by KDDI Technology
// Programmed by H.Kodama (D.F.Mac.@TripArts Music)

const imageUrls = [
  "/img/bg/bg1_1920x1080.jpeg",
  "/img/bg/bg2_1920x1080.jpeg",
  "/img/bg/bg3_1920x1080.jpeg",
  "/img/bg/bg4_1920x1080.jpeg",
  "/img/bg/bg5_1920x1080.jpeg",
];

class bgImageLoader {
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

export default bgImageLoader;

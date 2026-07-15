// voices.mjs
// (C)2026 by D.F.Mac.@TripArts Music

import Posmp from "./posmp2.mjs";

const DEB = false;

const samples = [
  { path: "/wav/voices/3.wav", tags: ["3"] },
  { path: "/wav/voices/2.wav", tags: ["2"] },
  { path: "/wav/voices/1.wav", tags: ["1"] },
  { path: "/wav/voices/start.wav", tags: ["0", "start"] },
  { path: "/wav/voices/owari.wav", tags: ["owari", "end"] },
  { path: "/wav/voices/sushi_whistle1.mp3", tags: ["whistle", "fue"] },
  { path: "/wav/voices/sushi_whistle2.mp3", tags: ["whistle2", "fue2"] },
];

// tag（別名）から samples のインデックスを引くマップ
const tagIndex = {};
samples.forEach((sample, index) => {
  for (const tag of sample.tags) {
    tagIndex[tag] = index;
  }
});

const VELOCITY = 1.4;

class voicePlayer {
  constructor(context) {
    this.path = null;
    this.loaded = false;
    this.samplers = [];
    this.context = context;
    this.context.resume();
    this.gain = 0.5;
  }
  setContext(ctx) {
    this.context = ctx;
    for (let key in this.samplers) {
      this.samplers[key].smp.setContext(ctx);
    }
  }
  async load() {
    if (DEB) console.log("voicePlayer.load()");
    let res = [];
    let resPromises = [];
    for (let cnt = 0; cnt < samples.length; cnt++) {
      resPromises.push(this._loadSample(samples[cnt].path));
    }
    res = await Promise.all(resPromises);
    for (let cnt = 0; cnt < res.length; cnt++) {
      this.samplers.push(res[cnt]);
    }
    this.loaded = true;
    return this.samplers;
  }
  async _loadSample(sample) {
    if (DEB) console.log("voicePlayer._loadSample() sample=" + sample);
    return new Promise((resolve) => {
      let sampler = new Posmp(this.context);
      sampler.init(sample).then((_smp) => {
        resolve({ smp: _smp });
      });
    });
  }
  setGain(volume) {
    if (DEB) console.log("voicePlayer.setGain() volume=" + volume);
    this.gain = volume;
  }
  playTag(at, tag, _velocity) {
    if (DEB) console.log("voicePlayer.playTag() at=" + at + " tag=" + tag + " vel=" + _velocity);
    let index = tagIndex[String(tag)];
    if (index != null) {
      this.play(at, index, _velocity);
    } else {
      console.error("invalid tag =" + tag);
    }
  }
  play(at, index, _velocity) {
    if (DEB) console.log("voicePlayer.play() at=" + at + " index=" + index + " vel=" + _velocity);
    this.context.resume();
    let sampler = this.samplers[index].smp;
    let _when = at;
    sampler.play({ when: _when }, this.gain * _velocity);
  }
  polyPlay(at, indexes) {
    if (DEB) console.log("voicePlayer.polyPlay() at=" + at);
    for (let cnt = 0; cnt < indexes.length; cnt++) {
      this.play(at, indexes[cnt], VELOCITY);
    }
  }
}

export default voicePlayer;

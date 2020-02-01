import { getAsset } from '../assets';

export class Sound {
  private audio: HTMLAudioElement;

  constructor(soundType: string, soundName: string) {
    const path = getAsset(`assets/sounds/${soundType}/${soundName}.mp3`);
    this.audio = new Audio(path);
    this.audio.volume = 0.05;
  }

  play() {
    const isPlaying =
      this.audio.currentTime > 0 && !this.audio.paused && !this.audio.ended && this.audio.readyState > 2;
    if (!isPlaying) {
      this.audio.play().catch(() => undefined);
    }
  }
}

export const getSound = (soundType: string, soundName: string): Sound => {
  const sound = new Sound(soundType, soundName);
  return sound;
};

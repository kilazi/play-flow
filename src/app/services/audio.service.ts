import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioElement: HTMLAudioElement;
  private soundEffectsElement: HTMLAudioElement;
  private tracks: string[] = [
    'assets/sounds/durotar.mp3',
    'assets/sounds/elwynn-forest.mp3',
    'assets/sounds/teldrassil.mp3'
  ];
  private currentTrackIndex: number = -1;

  // Sound effect paths
  private readonly QUEST_COMPLETE_SOUND = 'assets/sounds/quest-complete.mp3';
  private readonly LEVEL_UP_SOUND = 'assets/sounds/level-up.mp3';

  constructor() {
    this.audioElement = new Audio();
    this.soundEffectsElement = new Audio();
    
    // When current track ends, play next track
    this.audioElement.addEventListener('ended', () => {
      this.playNextTrack();
    });
  }

  /**
   * Start playing music with a random track
   */
  public startBackgroundMusic(): void {
    this.currentTrackIndex = this.getRandomTrackIndex();
    this.playCurrentTrack();
  }

  /**
   * Play the next track in the list, or loop back to the first
   */
  private playNextTrack(): void {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.playCurrentTrack();
  }

  /**
   * Play the current track
   */
  private playCurrentTrack(): void {
    if (this.currentTrackIndex >= 0 && this.currentTrackIndex < this.tracks.length) {
      this.audioElement.src = this.tracks[this.currentTrackIndex];
      this.audioElement.play().catch(error => console.error('Error playing audio:', error));
    }
  }

  /**
   * Stop background music
   */
  public stopBackgroundMusic(): void {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }

  /**
   * Get random index for tracks array
   */
  private getRandomTrackIndex(): number {
    return Math.floor(Math.random() * this.tracks.length);
  }

  /**
   * Set volume level (0.0 to 1.0)
   */
  public setVolume(volume: number): void {
    this.audioElement.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Play quest complete sound effect
   */
  public playQuestCompleteSound(): void {
    this.playSoundEffect(this.QUEST_COMPLETE_SOUND);
  }

  /**
   * Play level up sound effect
   * This will play exclusively without the quest complete sound
   */
  public playLevelUpSound(): void {
    this.playSoundEffect(this.LEVEL_UP_SOUND);
  }

  /**
   * Play a sound effect
   */
  private playSoundEffect(soundPath: string): void {
    this.soundEffectsElement.src = soundPath;
    this.soundEffectsElement.play().catch(error => console.error('Error playing sound effect:', error));
  }
} 
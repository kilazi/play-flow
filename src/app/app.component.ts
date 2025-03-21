import { Component, OnInit } from '@angular/core';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <h1>{{ title }}</h1>
      <app-quest-form></app-quest-form>
      <app-quest-list></app-quest-list>
      <app-exp-bar></app-exp-bar>
      
      <!-- Music controls -->
      <div class="music-controls">
        <label>
          <input type="checkbox" [checked]="musicEnabled" (change)="toggleMusic()">
          Background Music
        </label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1" 
          [value]="musicVolume" 
          (input)="adjustVolume($event)"
          [disabled]="!musicEnabled">
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      width: 391px;
      height: 520px;
      margin: 0 auto;
      padding: 10px;
      box-sizing: border-box;
      overflow-y: auto;
      position: relative;
    }
    h1 {
      text-align: center;
      color: #ffc700;
      margin-top: 5px;
      font-size: 24px;
    }
    .music-controls {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'WoW Task Manager';
  musicEnabled = true;
  musicVolume = 0.5;
  
  constructor(private audioService: AudioService) {}
  
  ngOnInit() {
    // Start playing music when the app loads
    if (this.musicEnabled) {
      this.audioService.startBackgroundMusic();
      this.audioService.setVolume(this.musicVolume);
    }
  }
  
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    
    if (this.musicEnabled) {
      this.audioService.startBackgroundMusic();
      this.audioService.setVolume(this.musicVolume);
    } else {
      this.audioService.stopBackgroundMusic();
    }
  }
  
  adjustVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.musicVolume = parseFloat(input.value);
    this.audioService.setVolume(this.musicVolume);
  }
} 
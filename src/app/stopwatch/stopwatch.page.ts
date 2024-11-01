import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.page.html',
  styleUrls: ['./stopwatch.page.scss'],
})
export class StopwatchPage implements OnInit, OnDestroy {
  time = 0;
  displayTime = '00:00:00';
  milliseconds = '000';
  isRunning = false;
  hasStarted = false;
  interval: any;
  lapTimes: string[] = [];

  ngOnInit() {}

  ngOnDestroy() {
    this.stopTimer();
  }

  startStop() {
    if (this.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
    this.hasStarted = true;
  }

  startTimer() {
    this.isRunning = true;
    this.time=0;
    this.interval = setInterval(() => {
      this.time += 10; // Increment by 10ms
      this.updateDisplay();
    }, 10);
  }

  stopTimer() {
    this.isRunning = false;
    clearInterval(this.interval);
    this.addLapTime();
  }

  reset() {
    this.stopTimer();
    this.time = 0;
    this.hasStarted = false;
    this.updateDisplay();
    this.lapTimes = [];
  }

  addLapTime() {
    this.lapTimes.unshift(`${this.displayTime}.${this.milliseconds}`);
  }

  updateDisplay() {
    const hours = Math.floor(this.time / 3600000);
    const minutes = Math.floor((this.time % 3600000) / 60000);
    const seconds = Math.floor((this.time % 60000) / 1000);
    const ms = this.time % 1000;

    this.displayTime = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    this.milliseconds = this.pad(Math.floor(ms / 10), 2);
  }

  pad(num: number, length = 2): string {
    return num.toString().padStart(length, '0');
  }
}
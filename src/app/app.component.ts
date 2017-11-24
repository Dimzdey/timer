import { merge } from 'rxjs/observable/merge';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { map, timeInterval } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';


import { fromEvent } from 'rxjs/observable/fromEvent';

import { interval } from 'rxjs/observable/interval';
import { scan } from 'rxjs/operators/scan';

import { Observer } from 'rxjs/Observer';
import { buffer } from 'rxjs/operators/buffer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  wait;
  started = false;
  time = 0;
  timer;
  total = 0;


  @ViewChild('wait') waitBtn: ElementRef;

  ngOnInit() {

    this.wait = fromEvent(this.waitBtn.nativeElement, 'click').pipe(
      timeInterval(),
      scan((acc: any, val: any) => val.interval < 300 ? 1 : 0, 0),
      map(val => val === 0 ? false : true))
      .subscribe(val => {
        if (val === true) {
          this.startTimer(this.started);
        } else {
          return;
        }
        setTimeout(() => {
          this.startTimer(this.started);
        }, 301);
      });
  }

  startTimer(prd) {
    if (!prd) {
      this.timer = interval(1000).pipe(map(() => 1)).subscribe(val => this.total = this.total + val);
      this.started = true;
    } else {
      this.timer.unsubscribe();
      this.started = false;
    }
  }

  resetTimer() {
    this.total = 0;
  }
}

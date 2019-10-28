import { Component } from '@angular/core';
import { timer, Subject, of, BehaviorSubject, Subscription } from 'rxjs';
import {
  map,
  switchMap,
  scan,
  withLatestFrom,
  delay,
  shareReplay,
  tap,
  startWith,
  filter
} from 'rxjs/operators';

const ALPHABET = Array.from(Array(26), (_, index) => 65 + index);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private select = new Subject();

  subscription: Subscription;

  dispatcher = new Subject();
  state$ = this.dispatcher.pipe(
    shareReplay(1),
    scan((state, curr) => ({ ...state, ...curr }), {
      activeSection: null,
      movingSection: false,
      movingIndex: false,
      activeIndex: null
    })
  );

  activeSection$ = timer(0, 1000).pipe(
    withLatestFrom(this.state$, (_, state) => state),
    filter((state: any) => state.movingSection),
    map(state => (state.activeSection + 1) % 4),
    tap(activeSection => this.dispatcher.next({ activeSection }))
  );

  activeIndex$ = timer(0, 1000).pipe(
    withLatestFrom(this.state$, (_, state) => state),
    filter((state: any) => state.movingIndex),
    map(state => (state.activeIndex + 1) % 7),
    tap(activeIndex => this.dispatcher.next({ activeIndex }))
  );

  movingSection$ = this.state$.pipe(map(({ movingSection }) => movingSection));

  letterM = Array(
    ALPHABET.filter((_, index) => index / 7 < 1),
    ALPHABET.filter((_, index) => index / 7 < 2 && index / 7 >= 1),
    ALPHABET.filter((_, index) => index / 7 < 3 && index / 7 >= 2),
    ALPHABET.filter((_, index) => index / 7 < 4 && index / 7 >= 3)
  );

  timer$ = timer(0, 1000);

  constructor() {
    this.state$.subscribe();

    /* this.subscription = timer(0, 1000)
      .pipe(map(tick => ({ activeSection: tick % 4 })))
      .subscribe(this.dispatcher); */

    this.timer$.pipe(
      withLatestFrom(this.state$),
      filter((state: any) => state.movingSection),
      map(state => ({ activeSection: (state.activeSection + 1) % 4 }))
    );

    setTimeout(() =>
      this.dispatcher.next({
        activeSection: 0,
        movingSection: true
      })
    );
  }

  index$ = this.state$.pipe(
    switchMap(({ activeSection }) =>
      timer(0, 1000).pipe(
        map(tick => tick % (this.letterM[activeSection].length + 1))
      )
    )
  );

  handleClick() {
    // this.dispatcher.next({ activeSection: 1 });
    // this.subscription.unsubscribe();
    this.dispatcher.next({
      movingSection: false,
      movingIndex: true,
      activeIndex: 0
    });
  }

  /* index$ = this.select.pipe(
    switchMap(() =>
      timer(0, 1000).pipe(map(tick => tick % (this.letters.length + 1)))
    )
  ); */

  /*
  index$ = this.select.pipe(
    switchMap(() =>
      timer(0, 1000).pipe(map(tick => tick % (this.letters.length + 1)))
    )
  );

  letter$ = this.index$.pipe(
    map(index => this.getCharacter(this.letters, index))
  );

  word$ = this.select.pipe(
    withLatestFrom(this.letter$, (_, letter) => letter),
    scan((state: string, letter: string) => state + letter, '')
  );

  private getCharacter(letters: number[], index: number) {
    return index < 26 ? String.fromCharCode(letters[index]) : ' ';
  }

  activateNext() {}

  handleClick() {
    this.select.next();
  } */
}

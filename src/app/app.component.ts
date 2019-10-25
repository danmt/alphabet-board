import { Component } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { map, switchMap, scan, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private select = new Subject();
  letters = Array.from(Array(26), (_, index) => 65 + index);
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

  handleClick() {
    this.select.next();
  }
}

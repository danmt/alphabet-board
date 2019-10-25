import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { isNumber } from 'util';

@Directive({
  selector: '[appCharacterSelector]'
})
export class CharacterSelectorDirective implements OnInit {
  selectedId: number;

  @Input() set selected(value: number) {
    if (isNumber(this.selectedId)) {
      this.getArticle(this.selectedId).classList.remove('active');
    }

    if (isNumber(value)) {
      this.selectedId = value;
      this.getArticle(this.selectedId).classList.add('active');
    }
  }

  articles: HTMLCollection;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.articles = this.el.nativeElement.getElementsByTagName('article');
  }

  private getArticle(index: number) {
    return this.articles.item(index);
  }
}

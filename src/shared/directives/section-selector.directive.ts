import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { isNumber } from 'util';

@Directive({
  selector: '[appSectionSelector]'
})
export class SectionSelectorDirective implements OnInit {
  selectedId: number;

  @Input() set selected(value: number) {
    if (isNumber(this.selectedId)) {
      this.getSection(this.selectedId).classList.remove('active');
    }

    if (isNumber(value)) {
      this.selectedId = value;
      this.getSection(this.selectedId).classList.add('active');
    }
  }

  sections: HTMLCollection;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.sections = this.el.nativeElement.getElementsByTagName('section');
  }

  private getSection(index: number) {
    return this.sections.item(index);
  }
}

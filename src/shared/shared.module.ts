import { NgModule } from '@angular/core';
import { CharPipe } from './pipes/char.pipe';
import { CommonModule } from '@angular/common';
import { CharacterSelectorDirective } from './directives/character-selector.directive';
import { SectionSelectorDirective } from './directives/section-selector.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CharPipe,
    CharacterSelectorDirective,
    SectionSelectorDirective
  ],
  exports: [CharPipe, CharacterSelectorDirective, SectionSelectorDirective]
})
export class SharedModule {}

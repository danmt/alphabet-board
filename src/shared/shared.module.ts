import { NgModule } from '@angular/core';
import { CharPipe } from './pipes/char.pipe';
import { CommonModule } from '@angular/common';
import { CharacterSelectorDirective } from './directives/character-selector.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CharPipe, CharacterSelectorDirective],
  exports: [CharPipe, CharacterSelectorDirective]
})
export class SharedModule {}

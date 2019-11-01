import { NgModule } from '@angular/core';
import { CharPipe } from './pipes/char.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [CharPipe],
  exports: [CharPipe]
})
export class SharedModule {}

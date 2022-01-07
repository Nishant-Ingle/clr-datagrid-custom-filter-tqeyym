import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'bottom-comp',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.css'],
})
export class BottomComponent {
  @Output() status: EventEmitter<string> = new EventEmitter();

  previousValue = '';
  previousElement: Element;
  activeClassName = 'link-active';

  emit(value: string): void {
    const discElement = document.querySelector('#disc-opt');
    const expElement = document.querySelector('#exp-opt');

    if (value === this.previousValue) {
      this.previousElement.classList.remove(this.activeClassName);
      this.previousValue = '';
      this.previousElement = undefined;
      value = '';
    } else if (value === 'Exp') {
      // remove from all for large set of options
      discElement.classList.remove(this.activeClassName);
      expElement.classList.add(this.activeClassName);
      this.previousValue = 'Exp';
      this.previousElement = expElement;
    } else {
      discElement.classList.add(this.activeClassName);
      expElement.classList.remove(this.activeClassName);
      this.previousValue = 'Disc';
      this.previousElement = discElement;
    }

    this.status.emit(value);
  }
}

import { Component, EventEmitter } from '@angular/core';
import { ClrDatagridFilterInterface } from '@clr/angular';
import { User } from '../inventory/user.interface';
import { COLORS } from '../inventory/values';

@Component({
  selector: 'color-filter2',
  template: ` <span
    *ngFor="let color of allColors"
    class="color-square color-selectable"
    (click)="toggleColor(color)"
    [style.backgroundColor]="color"
    [class.color-selected]="selectedColors[color]"
  ></span>`,
  styleUrls: ['./color.filter2.scss'],
})
export class ColorFilter2 implements ClrDatagridFilterInterface<User> {
  allColors = COLORS;
  selectedColors: { [color: string]: boolean } = {};
  nbColors = 0;

  changes: any = new EventEmitter<any>(false);

  listSelected(): string[] {
    const list: string[] = [];
    for (const color in this.selectedColors) {
      if (this.selectedColors[color]) {
        list.push(color);
      }
    }
    return list;
  }

  toggleColor(color: string) {
    this.selectedColors[color] = !this.selectedColors[color];
    if (this.selectedColors[color]) {
      this.nbColors++;
    } else {
      this.nbColors--;
    }
    this.changes.emit(true);
  }

  accepts(user: User) {
    return this.nbColors === 0 || this.selectedColors[user.color];
  }

  isActive(): boolean {
    return this.nbColors > 0;
  }
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

import { User } from './inventory/user.interface';
import { Inventory } from './inventory/inventory.provider';

import { Subject, Observable } from 'rxjs';

import { ClrDatagridFilterInterface } from '@clr/angular';

export class ColorFilter implements ClrDatagridFilterInterface<User> {
  public selectedColors: string[] = [];

  public changes = new Subject<any>();

  public isActive(): boolean {
    return this.selectedColors.length > 0;
  }

  public accepts(user: User): boolean {
    return this.selectedColors.indexOf(user.color.toLocaleLowerCase()) > -1;
  }
}

export class StatusFilter implements ClrDatagridFilterInterface<User> {
  public selectedStatus: string = '';

  public changes = new Subject<any>();

  public isActive(): boolean {
    return this.selectedStatus != '';
  }

  public accepts(user: User): boolean {
    return this.selectedStatus === user.status;
  }
}

@Component({
  selector: 'clr-basic-datagrid',
  providers: [Inventory],
  templateUrl: './basic-datagrid.component.html',
})
export class BasicDatagridComponent {
  users: User[];
  customColorFilter: ColorFilter;
  customStatusFilter: StatusFilter;
  status: string;

  constructor(inventory: Inventory) {
    inventory.size = 10;
    inventory.reset();
    this.users = inventory.all;

    this.customColorFilter = new ColorFilter();
    this.customStatusFilter = new StatusFilter();
  }

  toggleSelection(event: any) {
    if (event.target.checked) {
      this.customColorFilter.selectedColors.push(event.target.value);
    } else {
      const colorName = event.target.value;
      const index = this.customColorFilter.selectedColors.indexOf(colorName);
      if (index > -1) {
        this.customColorFilter.selectedColors.splice(index, 1);
      }
    }
    this.customColorFilter.changes.next(true);
  }

  toggleStatusSelection(expiryStatus) {
    this.customStatusFilter.selectedStatus = expiryStatus;
    this.customStatusFilter.changes.next(true);
  }
}

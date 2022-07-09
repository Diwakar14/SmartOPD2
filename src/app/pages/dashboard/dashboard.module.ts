import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SharedModule } from './../../sharedModule/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

import { MatRippleModule } from '@angular/material/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuickAccessComponent } from './components/quick-access/quick-access.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { QuickAccessItemsComponent } from './components/quick-access/components/quick-access-items/quick-access-items.component';


const MATERIAL_COMPONENTS = [
  MatRippleModule,
  MatTooltipModule,
  MatDialogModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent,
    QuickAccessComponent,
    ConfirmDialogComponent,
    ClickOutsideDirective,
    QuickAccessItemsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ...MATERIAL_COMPONENTS,
    KeyboardShortcutsModule.forRoot()
  ]
})
export class DashboardModule { }

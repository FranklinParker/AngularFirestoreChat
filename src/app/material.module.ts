import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports: [
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: []
})
export class MaterialModule {
}

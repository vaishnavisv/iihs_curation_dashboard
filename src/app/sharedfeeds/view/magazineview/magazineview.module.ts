import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoverToolbarModule } from '../../components';
import { MagazineviewComponent } from './magazineview.component';
//import { DropdownComponent } from '../../../layout/bs-component/components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HoverToolbarModule
    ],
    declarations: [MagazineviewComponent],
    exports: [MagazineviewComponent]
})
export class MagazineviewModule { }
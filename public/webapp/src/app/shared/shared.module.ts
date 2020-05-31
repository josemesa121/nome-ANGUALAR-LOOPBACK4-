import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ContentComponent } from '../components/content/content.component';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { FooterComponent } from '../components/footer/footer.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Auth } from '../services';
import { RepeatTypeComponent } from './../formly/repeat-section.type';
import { FieldWrapperComponent } from './../formly/field-wrapper.component';

import { Ng5SliderModule } from 'ng5-slider';
import { NgxMaskModule } from 'ngx-mask';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_ICONS } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    // NgbModule.forRoot(),
    // NgxDatatableModule,
    RouterModule,
    CommonModule,
    DragDropModule,
    ScrollingModule,
    BrowserModule,
    NgxMaskModule.forRoot(),
    NzTimePickerModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'repeat', component: RepeatTypeComponent },
      ],
      wrappers: [
        { name: 'field', component: FieldWrapperComponent },
      ],
    }),
    Ng5SliderModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    // NgbModule,
    // NgxDatatableModule,
    RouterModule,
    Ng5SliderModule,
    NgxMaskModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    NzTimePickerModule,
    DragDropModule,
    ScrollingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  providers: [
    Auth,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons }
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    RepeatTypeComponent,
    ContentComponent,
    FieldWrapperComponent
  ]
})
export class SharedModule { }

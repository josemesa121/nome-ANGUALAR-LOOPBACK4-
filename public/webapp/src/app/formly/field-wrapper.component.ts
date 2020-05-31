import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-field',
  template: `
    <fieldset class="form-group position-relative has-icon-left mb-1 borderinput">
      <ng-container #fieldComponent></ng-container>
      <div class="form-control-position"><i class="{{to.icon}}"></i></div>
    </fieldset>    
  `,
})
export class FieldWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef, static: true }) fieldComponent: ViewContainerRef;
}

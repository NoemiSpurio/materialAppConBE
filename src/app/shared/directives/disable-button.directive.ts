import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[disableButton]'
})
export class DisableButtonDirective {

  constructor(private elementRef: ElementRef) { }

  @Input() set isDisabled(disable: boolean){
    if(!disable){
      this.elementRef.nativeElement.style.display = 'none';
    }
    else{
      this.elementRef.nativeElement.style.display = 'block';
    }
  }

}

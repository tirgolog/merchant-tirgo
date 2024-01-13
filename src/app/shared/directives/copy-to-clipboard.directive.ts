import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCopyToClipboard]'
})
export class CopyToClipboardDirective {
  @Input() appCopyToClipboard!: string;

  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    if (this.appCopyToClipboard) {
      const textarea = document.createElement('textarea');
      textarea.value = this.appCopyToClipboard;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }
}
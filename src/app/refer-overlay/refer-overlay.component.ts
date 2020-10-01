import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-refer-overlay',
  templateUrl: './refer-overlay.component.html',
  styleUrls: ['./refer-overlay.component.scss']
})
export class ReferOverlayComponent implements OnInit {

  @Input('show') show: boolean = false;

  @Input() message = '';

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  clipboardCopied = false;

  public close() {
    this.onClose.emit();
  }

  stopPropagate(event) {
    event.stopPropagation();
  }

  showCopyMessage(): void {
    this.clipboardCopied = true;
    setTimeout(() => {
      this.clipboardCopied = false;
    }, 3000);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, HostBinding, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { CustomDropdownService } from '../custom-dropdown.service';

@Component({
  selector: 'app-custom-select-option',
  template: '{{value}}',
  styleUrls: ['./custom-select-option.component.scss']
})
export class CustomSelectOptionComponent implements OnInit {

  @Input ()
  public key: string;
 
  @Input()
  public value: string;

  @HostBinding ('class.selected')
  public get selected(): boolean {
    return this.select.selectedOption === this;
  }
  private select: CustomSelectComponent;

  constructor(private dropdownService: CustomDropdownService) {
    this.select = this.dropdownService.getSelect();
  }

  @HostListener ('click', ['$event'])
  public onClick(event: UIEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.select.selectOption(this);
  }

  ngOnInit(): void {
  }

}

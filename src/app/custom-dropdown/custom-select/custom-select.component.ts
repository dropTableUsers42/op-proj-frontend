import { AfterViewInit, Component, ContentChildren, ElementRef, forwardRef, Input, OnInit, QueryList, Renderer2, ViewChild } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CustomSelectOptionComponent } from '../custom-select-option/custom-select-option.component';
import { CustomDropdownService } from '../custom-dropdown.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss',
          './custom-select-colors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    },
    CustomDropdownService]
})
export class CustomSelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input ()
  public label: string;

  @Input ()
  public labelUrl: string;
 
  @Input()
  public placeholder: string;
 
  @Input()
  public selected: string;
 
  @Input()
  public required = false;
 
  @Input()
  public disabled = false;

  @Input()
  public styleType = 'home';

  @ViewChild('labelSvg') labelSvg: ElementRef;

  @ViewChild('input')
  public input: ElementRef;
 
  @ViewChild(DropdownComponent)
  public dropdown: DropdownComponent;

  @ContentChildren (CustomSelectOptionComponent)
  public options: QueryList<CustomSelectOptionComponent>;

  public selectedOption: CustomSelectOptionComponent;
 
  public displayText: string;
 
  public showDropdown(): void {
    this.dropdown.show();
  }

  public onDropMenuIconClick(event: UIEvent): void {
    event.stopPropagation();
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.input.nativeElement.click();
    }, 10);
  }

  get main_class(): {} {
    let ret = {'input-wrapper': true};

    ret[this.styleType] = true;
    return ret;
  }

  constructor(private renderer: Renderer2, private dropdownService: CustomDropdownService) {
    this.dropdownService.register(this);
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.renderer.setStyle(this.labelSvg.nativeElement, '-webkit-mask', 'url(' + this.labelUrl + ') no-repeat center');
    this.renderer.setStyle(this.labelSvg.nativeElement, 'mask', 'url(' + this.labelUrl + ') no-repeat center');

    setTimeout(() => {
      this.selectedOption = this.options.toArray().find(option => option.key === this.selected);
      this.displayText = this.selectedOption ? this.selectedOption.value : '';
    });

  }

  public selectOption(option: CustomSelectOptionComponent): void {
    this.selected = option.key;
    this.selectedOption = option;
    this.displayText = this.selectedOption ? this.selectedOption.value : '';
    this.hideDropdown();
    this.input.nativeElement.focus();
    this.onChange();
  }

  public hideDropdown(): void {
    this.dropdown.hide();
  }

  public onChangeFn = (_: any) => {};
 
  public onTouchedFn = () => {};
 
  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
 
  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
 
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
 
  public writeValue(obj: any): void {
    this.selected = obj;
  }
 
  public onTouched(): void {
    this.onTouchedFn();
  }
 
  public onChange(): void {
    this.onChangeFn(this.selected);
  }

}

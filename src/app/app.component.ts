import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit{

  title: 'google';
  form;
  buttonDisabled = true;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.form = this.formBuilder.group(
      {
        userName: ['',
          [
          Validators.nullValidator,
            Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
            Validators.required]]
      }
    );
  }

  ngAfterViewInit(): void {
    this.form.get('userName').valueChanges.subscribe(() => {
      const userNameValue: string = this.form.get('userName').value;
      this.buttonDisabled = !/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$/.test(userNameValue);
    });
  }


  constructor(private primengConfig: PrimeNGConfig,
              private formBuilder: FormBuilder) {}


  onClick(): void {

  }

  isError(key: string, error = 'required'): boolean {
    const control: AbstractControl = this.form.get(key);
    return control.hasError(error) && control.touched && control.pending;
  }


}

import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataExchangeService} from '../services/data-exchange.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  buttonDisabled = true;

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        userName: ['',
          [
            Validators.required,
            Validators.nullValidator,
            Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
          ]]
      }
    );
  }

  ngAfterViewInit(): void {
    this.form.get('userName').valueChanges.subscribe(() => {
      const userNameValue: string = this.form.get('userName').value;
      this.buttonDisabled = !/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$/.test(userNameValue);
    });
  }


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dataService: DataExchangeService) {}


  onClick(): void {
    if (this.form.valid && this.form.touched) {
      this.router.navigate(['search']).then(
        this.dataService.userName = this.form.get('userName').value
      );
    } else {
      for (const i in this.form.controls) {
        this.form.controls[i].markAsTouched();
        this.router.navigate(['user']);
      }
    }

  }

  isError(key: string, error = 'required'): boolean {
    const control: AbstractControl = this.form.get(key);
    return control.hasError(error) && control.touched;
  }

}

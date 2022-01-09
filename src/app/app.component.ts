import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{

  title: 'google';

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  constructor(private primengConfig: PrimeNGConfig) {}

}

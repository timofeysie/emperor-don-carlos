import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ThemeService } from '../theme.service';

const themes = {
  autumn: {
    primary: '#F78154',
    secondary: '#4D9078',
    tertiary: '#B4436C',
    light: '#FDE8DF',
    medium: '#FCD0A2',
    dark: '#B89876'
  },
  night: {
    primary: '#8CBA80',
    secondary: '#FCFF6C',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#495867'
  },
  neon: {
    primary: '#39BFBD',
    secondary: '#4CE0B3',
    tertiary: '#FF5E79',
    light: '#F4EDF2',
    medium: '#B682A5',
    dark: '#34162A'
  }
};

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  quantum = 4; // spacing-unit
  columns = 3; // margins
  gutter = 2; // grid-columns
  borderWidth = 0;
  borderRadius = 0;
  public theme: ThemeService;

  constructor(private elementRef: ElementRef,
    private _theme: ThemeService) {
      this.theme = _theme;
     }

  ngOnInit() {
    this.elementRef.nativeElement.style.setProperty('--spacing-unit', this.quantum + 'px');
    this.elementRef.nativeElement.style.setProperty('--grid-columns', this.columns);
    this.elementRef.nativeElement.style.setProperty('--margins', this.gutter + 'px');
    this.gutterChange();
  }

  changeTheme(name: string) {
    this.theme.setTheme(themes[name]);
  }


  borderWidthChange() {
    this.elementRef.nativeElement.style.setProperty('--border-width', this.borderWidth + 'px');
  }

  borderRadiusChange() {
    this.elementRef.nativeElement.style.setProperty('--border-radius', this.borderRadius + 'px');
  }

  quantumChange() {
    this.elementRef.nativeElement.style.setProperty('--spacing-unit', this.quantum + 'px');
  }

  columnsChange() {
    this.elementRef.nativeElement.style.setProperty('--grid-columns', this.columns);
  }

  gutterChange() {
    this.elementRef.nativeElement.style.setProperty('--grid-gutter', this.gutter + 'px');
  }

}

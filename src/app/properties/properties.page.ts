import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  quantum: number = 20; // spacing-unit
  columns: number = 3; // margins
  gutter: number = 2; // grid-columns

  constructor(private elementRef:ElementRef) { }

  ngOnInit() { }

  quantumChange() {
    this.elementRef.nativeElement.style.setProperty('--spacing-unit', this.quantum + 'px');
    console.log('quantum',this.quantum);
  }

  columnsChange() {
    this.elementRef.nativeElement.style.setProperty('--margins', this.gutter + 'px');
    console.log('gutter',this.gutter);
  }

  gutterChange() {
    this.elementRef.nativeElement.style.setProperty('--grid-columns', this.columns + 'px');
    console.log('columns',this.columns);
  }

}

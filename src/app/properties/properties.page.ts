import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  quantum = 4; // spacing-unit
  columns = 3; // margins
  gutter = 2; // grid-columns

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.style.setProperty('--spacing-unit', this.quantum + 'px');
    this.elementRef.nativeElement.style.setProperty('--grid-columns', this.columns);
    this.elementRef.nativeElement.style.setProperty('--margins', this.gutter);
  }

  quantumChange() {
    this.elementRef.nativeElement.style.setProperty('--spacing-unit', this.quantum + 'px');
    console.log('quantum', this.quantum);
  }

  columnsChange() {
    this.elementRef.nativeElement.style.setProperty('--grid-columns', this.columns);
    console.log('columns', this.columns);
  }

  gutterChange() {
    this.elementRef.nativeElement.style.setProperty('--margins', this.gutter);
    console.log('gutter', this.gutter);
  }

}

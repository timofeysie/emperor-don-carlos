import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  quantum: number = 20;
  quantum: columns = 20;
  quantum: gutter = 20;
  constructor() { }

  ngOnInit() {
    // Get the styles for the document.
    // This is where we've chosen to store all the global variables we use.
    // const styles = getComputedStyle(document.documentElement);
    // const quantum = document.getElementById('quantum');
    // const gutter = document.getElementById('gutter');
    // const columns = document.getElementById('columns');
    // // Set up event handlers for buttons.
    // const buttons = document.querySelectorAll('.picker-button');
    // for (let i = 0; i < buttons.length; i++) {
    //   buttons[i].addEventListener('click', chooseDefaultColor);
    // }
    // // Retrieve initial custom property values and update controls.
    // quantum.value = getVariable(styles, '--spacing-unit').replace('px', '');
    // gutter.value = getVariable(styles, '--margins');
    // columns.value = getVariable(styles, '--grid-columns');
    // // Set up event handlers for having the sliders update the custom properties
    // // at the document level.
    // quantum.addEventListener('input', () => {
    //   setDocumentVariable('--spacing-unit', quantum.value + 'px');
    // });
    // gutter.addEventListener('input', () => {
    //   setDocumentVariable('--margins', gutter.value);
    // });
    // columns.addEventListener('input', () => {
    //   setDocumentVariable('--grid-columns', columns.value);
    // });
  }

  getVariable(styles, propertyName) {
    return String(styles.getPropertyValue(propertyName)).trim();
  }

  // Auxiliary method. Sets the value of a custom property at the document level.
  setDocumentVariable(propertyName, value) {
    //document.documentElement.style.setProperty(propertyName, value);
  }

  // Sets the document color scheme to the color scheme of the clicked element.
  // This illustrates how it's easy to make a change affecting a large number of
  // elements by simply changing a few custom properties.
  chooseDefaultColor(event) {
    // Get the styles for the event target (the clicked button), so we can see
    // what its custom properties are set to.
    // const styles = getComputedStyle(event.target);
    //
    // // Get the values for the button's colours...
    // const primary = getVariable(styles, '--primary-color');
    // const text = getVariable(styles, '--primary-color-text');
    // // ... and apply them to the document.
    // setDocumentVariable('--primary-color', primary);
    // setDocumentVariable('--primary-color-text', text);
  }

}

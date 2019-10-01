# Emperor Don Carlos

An Ionic Angular app with dynamic theming.


## Adding CSS custom properties

Using [this demo](https://googlechrome.github.io/samples/css-custom-properties/) as a starting point, there was a lot of work to do to get this vanilla demo to play well in Angular land.

[This article](https://medium.com/@ingobrk/using-css-variables-in-angular-282a9edf1a20) helped to show how the variable bindings can work.

@HostBinding lets you set properties on the element or component that hosts the directive.
But we want to make this happen on the page stylesheet.

The way [shown on this thread](https://forum.ionicframework.com/t/ionic-4-how-to-set-css-custom-properties-dynamically/148500/13) uses something like this:
```
@HostBinding("attr.style")
public get valueAsStyle(): any {
  return this.sanitizer.bypassSecurityTrustStyle(`--spacing-unit: ${this.quantum}`);
}
```

Doesn't work.  Neither does this:
```
document.body.style.setProperty('--spacing-unit', this.quantum + 'px');
```

Also this one:
```
this.elementRef.nativeElement.style.setProperty('--spacing-unit', this.quantum);
```

This last one works, but only for the spacing unit.  The other two, margins and columns still don't work.

## The layout

Here is the basic markup from the demo source:
```html
<div class="grid">
  <div class="cell" style="--primary-color: #F44336; --primary-color-text: #FFF;">
    <header class="cell-header">
      <div class="cell-title">
        Red
      </div>
    </header>
    <main class="cell-content">
      Click the buttons on the cards to set the default color scheme for the
      whole sample.
    </main>
    <div class="cell-actions">
      <button class="picker-button">
        Use this color
        <div class="ripple"></div>
      </button>
    </div>
  </div>
  ...
```


The css:
```css
.grid {
  /* Resets */
  margin: 0;
  border: 0;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  padding: calc(var(--grid-margin) - var(--cell-margin));
  background-color: var(--grid-color);
}
.cell {
  font-family: 'Roboto', 'Helvetica', sans-serif;
  color: rgb(97, 97, 97);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: calc(var(--cell-margin));
  background-color: var(--cell-color);
  width: calc(100% / var(--grid-columns) - var(--grid-gutter));
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),
      0 3px 1px -2px rgba(0,0,0,.2),
      0 1px 5px 0 rgba(0,0,0,.12);
}

.cell-title {
  font-size: calc(3 * var(--spacing-unit));
}

.cell-header {
  display: flex;
  align-items: center;
  color: var(--primary-color-text);
  box-sizing: border-box;
  background-color: var(--primary-color);
  padding-left: calc(var(--cell-padding));
  height: calc(12 * var(--spacing-unit));
}

.cell-content {
  font-size: calc(2.5 * var(--spacing-unit));
  padding: calc(var(--cell-padding));
  flex-grow: 1;
}

.cell-actions {
  padding: calc(2 * var(--spacing-unit));
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
```

Currently, only the *--spacing-unit* property seems to be taking effect when dragging the range slider.

This means that changing *--grid-columns* and *--margins* have no effect.

Wait, grid columns and margins don't need 'px' attached to them like the spacing unit.  Still with this change, there is no layout change when modifying these values.



## In the beginning

This project was cloned from the GitHub repo for Episode 128 - Custom Theme Generator in Ionic 4.
The code was from a Firebase [article](https://angularfirebase.com/lessons/css-variables-in-ionic-4/#CSS-Variable-Basics) on using CSS variables and Ionic to override the theme dynamically.

The versions in the project upon clone was:
```
"@angular/core": "~6.1.1",
"@ionic/angular": "^4.0.0-beta.0",
"@ionic-native/core": "5.0.0-beta.14",
```

Needs updating for sure.

# Emperor Don Carlos

An Ionic Angular app with dynamic theming.

The PWA version of this project is live at [this address](https://emperor-don-carlos.firebaseapp.com/home).


## Creating the pwa

Following [this guide](https://ionicframework.com/docs/publishing/progressive-web-app).
```
npm install -g @angular/cli
ng add @angular/pwa
```
The error:
```
Installed packages for tooling via npm.
Invalid rule result: Instance of class Promise.
ionic build --prod --service-worker
ERROR in Module build failed: Error: Missing binding C:\Users\timof\repos\temp\emperor-don-carlos\node_modules\node-sass\vendor\win32-x64-72\binding.node
Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 12.x
Found bindings for the following environments:
  - Windows 64-bit with Node.js 8.x
....
at NormalModule.build (C:\Users\timof\repos\temp\emperor-don-carlos\node_modules\webpack\lib\NormalModule.js:365:15)[ERROR] An error occurred while running subprocess ng.
```

The solution:
```
$ node rebuild sass
```

create the project in Firebase.
https://console.firebase.google.com/?pli=1

```
npm install -g firebase-tools
firebase login
firebase init
ionic build --prod
```

Project Console: https://console.firebase.google.com/project/emperor-don-carlos/overview
Hosting URL: https://emperor-don-carlos.firebaseapp.com


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



  ebn
  '': calc(100% / var(--grid-columns) - var(--grid-gutter));
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

The values can be seen changing in the inspector tab.  Lets look closer.
--grid-gutter uses --margins.  It then gets used in the width property:
```
width: calc(100% / var(--grid-columns) - var(--grid-gutter));
```

In the inspector styles tab however, we see this:
```
.cell[_ngcontent-c0] {
    font-family: 'Roboto', 'Helvetica', sans-serif;
    color: #616161;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: calc(var(--cell-margin));
    background-color: var(--cell-color);
    width: calc(100% / var(--grid-columns) - var(--grid-gutter));
```

We might be experiencing the shadow DOM here.  Can we turn off the shadow DOM using Ionic?  I know Angular three options there.  But No. The components starting in Ionic 4 have been rewritten as web components, and use the shadow DOM

OK.  So it's not going to be as easy as first appeared.  The only to change shadow DOM Styles is by using CSS for variables that Ionic has specifically used CSS variables for. It’s like creating this API that can be used to interact with the component.

Not sure why a class *and* and inline style is used in the demo:
```
<div class="cell" style="--primary-color: #F44336; --primary-color-text: #FFF;">
```

It seemed like a nice excuse to blame the shadow DOM for the failing functionality, but the demo doesn't include any Ionic components, so this limitation should not apply to divs with classes.  Am I right?

### Playing with shadows

If you open the inspector and expand an Ionic component, you will see the shadow root which is the Shadow DOM. You can see a gray box with a light gray background and a line next to it. Everything in there is hidden from our CSS.

The ion-content web component has an ion-scroll which uses slots.  A slot is a way to provide some input to a web component. This is where the users content can be injected. ion-card and the ion-lists are inside of the Shadow DOM but it’s being projected there through slots. If you click on reveal on the ion-card, you can see that that’s actually sitting outside of the Shadow DOM so we can target this with styles because it’s not inside the Shadow DOM, it’s being projected there.


### The spinner speed

The svg element has class="spin".  The class is super simple:
```
.spin {
    animation: spin var(--speed) linear infinite;
}
```





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

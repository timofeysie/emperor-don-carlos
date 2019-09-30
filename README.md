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

Something for next week.


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

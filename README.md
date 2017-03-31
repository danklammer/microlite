# microlite
An uber small 1kb lightbox

#### Purpose

MicroLite is a javascript lightbox with zero dependencies. It has no extras, no icons, no options, no bloat, but looks nice and is easy to use. Ideal for including it directly in your page on an as-needed basis.

It only modifies and animates composite (transform and opacity) CSS properties, give you buttery smooth 60 FPS transitions.

It uses CSS multiple backgrounds to load in the high-res version on top of the low-res, making the experience fast and seamless.


#### Usage

Include the script in the bottom of your doc, then simply call the `microLite(); return false;` function via onclick on your link to the larger full-size image.

```
<a href="[full-image.jpg]" onclick="microLite(this); return false;">
  <img src="[thumbnail-image.jpg]" />
</a>
```

#### Features

- Prevents wheel-scrolling
- Closes on escape key keypress
- Removes listeners when closed, keeping your window events clean

#### Size

2,563 | 1,689
---|---
bytes | minified


#### Demo

[Try it out](http://output.jsbin.com/vopoba/)

![MicroLite demo](demo.gif "MicroLite")

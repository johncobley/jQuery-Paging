# jQuery-Paging
A jQuery based plugin that displays a list of clickable links that can be used to navigate across pages.

This project requires jQuery and the jQuery-UI CSS file.

## Example Usage:

### Html:
```html
  <input id="currentpage" type="hidden" value="1" />
  <input id="pages" type="hidden" value="10" />
  <div id="paging"></div>
```
### Javascript:
```javascript
$(".paging").paging({
    url: "www.mysite.com/list?page=",
    currentPage: parseInt($("#currentPage").val()),
    pages: $("#pages").val()
});
```
## Options

### url
*Required*

**Type:** String

**Default:** None
```javascript
  url: "http://www.mysite.com/list?page="
```
or
```javascript
  url: "http://www.mysite.com/list/^/index.html"
```

A relative or full URL of the page to be loaded including the request string.  If the plugin finds a carat symbol ("^") in the URL it will be replaced with the page number otherwise it will be placed at the end of the URL.  Page numbers are zero based so a link showing "1" will request page "0".

The URL can be full (`http://www.mysite.com/list/^/index.html`) or relative (`list/^/index.html`).
### currentPage
**Type:** Integer

**Default:** 1

```javascript
  currentPage: parseInt($("#currentPage").val())
```
The current page number.  This number should be the actual page number so when the first page is being shown this value should be "1".

This value can be a variable but the best way is probably to store the page number in a hidden input when generating the page.
### pages
**Type:** Integer

**Default:** 1

```javascript
  pages: $("#pages").val()
```
The total number of pages available.  This number should be the actual page number the final page whould have so when the last page is page ten this value should be "10".

This value can be a variable but the best way is probably to store the page number in a hidden input when generating the page.
### float
**Type:** String

**Default:** "right"

```javascript
  "float": "right"
```
Which side of the container the list should appear.

This sets the CSS float attribute of the `<ul>` element this plug-in creates.  For more information on the float property see [Mozilla Developer Network - CSS Float](https://developer.mozilla.org/en-US/docs/Web/CSS/float)

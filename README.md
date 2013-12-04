# Util.js

A set of reusable javascript utilities.  For a demo of the available utilites, look at `examples.html`.

**Requirements**

- [jQuery](http://jquery.com/)

## Mobile Functions

A set of functions for helping with responsive development.

```javascript
zsUtil.getDeviceWidth(); // returns the current screen width
zsUtil.isPhone(); // returns true if device is a phone, false otherwise
zsUtil.isTablet(); // returns true if device is a tablet, false otherwise
zsUtil.isMobile(); // returns true if device is a mobile device (tablet or phone), false otherwise
zsUtil.isDesktop(); // returns true if device is a desktop, false otherwise
```

The default screen width values for determining the device type are as follows:

- `PHONE_MAX`: 767
- `TABLET_MIN`: 768
- `TABLET_MAX`: 991
- `MOBILE_MAX`: 991
- `DESKTOP_MIN`: 992

To customize these values, add the following to the top of your script: `zsUtil.{ITEM} = {VALUE}`.
For example:

```javascript
zsUtil.MOBILE_MAX = 1000;
```

## POST Links

Allows a standard `<a>` tag to become a method="POST|PUT|DELETE" link.

Example:

```html
<a href="/foo" class="post-link">Post</a>
```

```javascript
$('.post-link').zsPostLink();
```

### Non-POST Links

Web browsers only allow for `POST` or `GET` methods as form actions.  To allow for other methods such as `PUT`
and `DELETE` we have to "trick" your web app.  This function allows you to add a hidden `_method` form field
to the payload.  It is up to your web app to utilize this.

To use, add `data-method="{method}"` to your link.  Examples:

```html
<a href="/foo" class="post-link" data-method="put">Put</a>
<a href="/foo" class="post-link" data-method="delete">Delete</a>
```

You can customize the form field template by overriding the `methodTemplate` option.

### Confirmation messages

You can add a ok/cancel popup to links on a per link basis, per method basis, or globally.

- *Per-Link*: Add the `data-confirm-message` attribute to your `<a>` tag. Example:

    ```html
    <a href="/foobar" class="post-link" data-confirm-message="Are you sure?">Publish</a>
    ```

- *Per-Method*: When instansiating the plugin, set the `messages->{method}` option. Example:

    ```javascript
    $('.post-link').zsPostLink({
        messages: {
            put: "Are you sure?" // this will give this confirmation message to all PUT links
        }
    });
    ```

- *Globally*: When instansiating the plugin, set the `messages->_all` option. Example:

    ```javascript
    $('.post-link').zsPostLink({
        messages: {
            _all: "Are you sure?"
        }
    });
    ```

The plugin first looks at the per-link, then falls back to the per-method, then to the global, then to none.

### CSRF Tokens

You can add CSRF tokens to your links by adding the `data-token` attribute. Example:

```html
<a href="/foobar" class="post-link" data-token="b4af4cc0c0511e">Publish</a>
```

This will add a `_token` (by default) value along with the form payload.  This is done by adding a hidden form
field.  It is up to your web app to generate and verify the token.  You can customize the template by overriding
the `tokenTemplate` option.

### Available Options

- **messages**: hash of default confirmation messages for each method (_all is default for every link)
- **tokenTemplate**: the form field template to use for CSRF tokens (default: `<input type="hidden" name="_token" />`)
- **methodTemplate**: the form field template to use for non-POST links (default: `<input type="hidden" name="_method" />`)

## Link Container

Sometimes it is useful for have an entire element be "linkable" - like the entire row of a table. This function
takes a container selector and makes it clickable and go to the first <a> it finds within it (by default).  Example:

```javascript
$('tbody tr').zsLinkContainer(); // makes all `tbody tr` elements linkable to the first <a> in it
```

### Link Target

You can customize the link target with the `targetSelector` option:

```javascript
$('tbody tr').zsLinkContainer({
    targetSelector: '.link-container-target'
});
```

### Hover class

By default, the container gets the `cursor` icon when hovering. You can customize this with the `hoverClass`
option:

```javascript
$('tbody tr').zsLinkContainer({
    hoverClass: 'foo'
});
```

### Available Options

- **targetSelector**: the anchor tag selector whose href will be used (default: `a:first`)
- **hoverClass**: the class to add to the container when hovering (default: `null`)

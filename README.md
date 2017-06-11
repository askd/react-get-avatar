# react-get-avatar

React Component that allows you to get an avatar using a webcam or upload from a file and crop it.

See browser support [here](http://caniuse.com/#feat=stream)


## [Demo](https://askd.github.io/react-get-avatar/)


## Usage

```javascript
<GetAvatar width={400} height={400} handleGet={ handleGetAvatar } />
```

You can use something like this to upload the image on server:

```javascript
handleGetAvatar(dataURI) {
  const blob = dataURItoBlob(dataURI);
  const formData = new FormData();
  formData.append('image', blob);

  postData('/upload', formData);
}
```

## Installation

```
npm install react-get-avatar
```

## Properties

| Property | Required | Type | Default Value  | Available Values  | Description |
| ----- | ----- | ----- | ----- | ----- | ----- |
| width | true | number | 0 | Any number | Avatar width  |
| height | true | number | 0 | Any number | Avatar height |
| imageType | false | string | `image/jpeg` | `image/jpeg`, `image/png`, `image/gif`, `image/webp` | Avatar image type |
| imageQuality | false | number | 0.5 | from 0.1 to 1 | Avatar image quality |
| className | false | string | | | Component className |
| navClassName | false | string | | | Navigation className |
| buttonClassName | false | shape({ toggle: string, upload: string, save: string, cancel: string }) | | | Buttons classNames |
| handleGet | true | func |  |  | Callback that returns image dataURI |

## More

<a href="https://evilmartians.com/?utm_source=getavatar">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>

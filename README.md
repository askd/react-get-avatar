# react-get-avatar

React Component that allows you to get an avatar with the web camera.

See browser support [here](http://caniuse.com/#feat=stream)


## [Demo](https://askd.github.io/react-get-avatar/)


## Usage

```javascript
<GetAvatar handleGet={ handleGetAvatar } />
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
| width | false | number | 0 | Any number | Image width  |
| height | false | number | 0 | Any number | Image height |
| handleGet | false | func |  |  | Callback that returns image dataURI |

## More

<a href="https://evilmartians.com/?utm_source=getavatar">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>

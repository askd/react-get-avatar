# React Get Avatar

React Component that allows you to get an avatar with the web camera.

## Usage

```javascript
<GetAvatar
  handleGet={ handleGetAvatar }
/>

handleGetAvatar(dataURI) {
  const blob = dataURItoBlob(dataURI);
  const formData = new FormData();
  formData.append('image', blob);

  postData('/upload', formData);
}
```


## [Demo](https://askd.github.io/react-get-avatar/)

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

Webpage Watermark
===

## 调用方法

```
let Watermark = require('webpage-watermark');

new Watermark({
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    color: '#000',
    id: 'watermark',
    text: 'Watermark',
    density: 100,
    clarity: 2,
    zIndex: -1,
    supportTip: '您的浏览器不支持Canvas'
})
```
or 

```html

<script src="../lib/index.js"></script>
<script>
    new Watermark({
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        color: '#f1f1f1',
        id: 'watermark',
        text: '这是一个水印',
        density: 100,
        clarity: 2,
        zIndex: -1,
        supportTip: '您的浏览器不支持Canvas'
    })
</script>

```

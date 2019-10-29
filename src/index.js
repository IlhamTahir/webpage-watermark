module.exports =  class Watermark {
    constructor(params){
            this.params = Object.assign({
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
            }, params);
            this._init();
            this._intervalometer();
    }

    resetText(text) {
        this.params.text = text;
        this._init();
    }

    _intervalometer() {
        let self = this;
        window.setInterval(function(){
            if (!document.getElementById(self.params.id + '-canvas')) {
                self._init();
            }
        }, 1000);
    }

    _init() {
        this._createCanvas();
        this._fill();
    }

    _createCanvas() {
        let containerNode = document.getElementById(this.params.id);
        if (!containerNode) {
            this.params.supportTip = '无法定位水印节点';
        }
        containerNode.style.cssText= containerNode.style.cssText + 'position: relative;';

        let width = containerNode.offsetWidth;
        let height = containerNode.offsetHeight;
        let canvas = document.createElement('canvas');
        canvas.setAttribute('id', this.params.id + '-canvas');
        canvas.innerHTML = this.params.supportTip;
        canvas.width = width * this.params.clarity;
        canvas.height = height * this.params.clarity;
        canvas.style.cssText= 'position: absolute;width: 100%;height: 100%;left:0;top:0;z-index: '+this.params.zIndex+';';
        containerNode.appendChild(canvas);
    }

    _fill() {
        let redundance = 10;
        let canvas = document.getElementById(this.params.id + '-canvas');
        let containerNode = document.getElementById(this.params.id);
        let cxt = canvas.getContext('2d');
        let times = containerNode.offsetWidth * this.params.clarity / this.params.density + redundance;
        let heightTimes = containerNode.offsetHeight * this.params.clarity * 1.5 / this.params.density;
        cxt.rotate(-15 * Math.PI / 180);

        for (let i = 0; i < times; i++) {
            for (let j = 0; j < heightTimes; j++) {
                cxt.fillStyle = this.params.color;
                cxt.font = this.params.fontStyle + ' '
                    + this.params.fontVariant + ' '
                    + this.params.fontWeight + ' '
                    + this.params.fontSize + ' '
                    + this.params.fontFamily + ' ';
                cxt.fillText(this.params.text, this.params.density * (i - redundance / 2), j * this.params.density);
            }
        }
    }
};

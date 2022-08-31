"use strict";
const defaultConfig = {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    color: '#c1c1c1',
    id: 'watermark',
    text: 'Watermark',
    density: 100,
    clarity: 2,
    zIndex: 1,
    duration: 1000,
    supportTip: '您的浏览器不支持Canvas'
};
class Watermark {
    constructor(watermarkConfig) {
        this.watermarkConfig = Object.assign(defaultConfig, watermarkConfig);
        this._init();
        this._setAntiDeletion();
    }
    resetText(text) {
        this.watermarkConfig.text = text;
        this._init();
    }
    _setAntiDeletion() {
        let self = this;
        window.setInterval(function () {
            if (!document.getElementById(self.watermarkConfig.id + '-canvas')) {
                self._init();
            }
        }, this.watermarkConfig.duration);
    }
    _init() {
        this._createCanvas();
        this._fill();
    }
    _createCanvas() {
        let containerNode = document.getElementById(this.watermarkConfig.id);
        if (!containerNode) {
            this.watermarkConfig.supportTip = '无法定位水印节点';
            return;
        }
        containerNode.style.cssText = containerNode.style.cssText + 'position: relative;';
        let width = containerNode.offsetWidth;
        let height = containerNode.offsetHeight;
        let canvas = document.createElement('canvas');
        canvas.setAttribute('id', this.watermarkConfig.id + '-canvas');
        canvas.innerHTML = this.watermarkConfig.supportTip;
        canvas.width = width * this.watermarkConfig.clarity;
        canvas.height = height * this.watermarkConfig.clarity;
        canvas.style.cssText = `position:absolute;width: 100%;height: 100%;left:0;top:0;z-index: ${this.watermarkConfig.zIndex}`;
        containerNode.appendChild(canvas);
    }
    _fill() {
        let reDunDance = 10;
        // @ts-ignore
        let canvas = document.getElementById(this.watermarkConfig.id + '-canvas');
        let containerNode = document.getElementById(this.watermarkConfig.id);
        if (!canvas || !containerNode) {
            this.watermarkConfig.supportTip = '无法定位水印节点';
            return;
        }
        let cxt = canvas.getContext('2d');
        if (!cxt) {
            this.watermarkConfig.supportTip = '无法定位水印节点';
            return;
        }
        let times = containerNode.offsetWidth * this.watermarkConfig.clarity / this.watermarkConfig.density + reDunDance;
        let heightTimes = containerNode.offsetHeight * this.watermarkConfig.clarity * 1.5 / this.watermarkConfig.density;
        cxt.rotate(-15 * Math.PI / 180);
        for (let i = 0; i < times; i++) {
            for (let j = 0; j < heightTimes; j++) {
                cxt.fillStyle = this.watermarkConfig.color;
                cxt.font = this.watermarkConfig.fontStyle + ' '
                    + this.watermarkConfig.fontVariant + ' '
                    + this.watermarkConfig.fontWeight + ' '
                    + this.watermarkConfig.fontSize + ' '
                    + this.watermarkConfig.fontFamily + ' ';
                cxt.fillText(this.watermarkConfig.text, this.watermarkConfig.density * (i - reDunDance / 2), j * this.watermarkConfig.density);
            }
        }
    }
}

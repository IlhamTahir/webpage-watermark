type WatermarkConfig = {
    fontFamily: string,
    fontStyle: string,
    fontVariant: string,
    fontWeight: string,
    fontSize: string,
    color: string,
    id: string,
    text: string,
    density: number,
    clarity: number,
    zIndex: number,
    duration: number,
    supportTip: string
}

const defaultConfig: WatermarkConfig = {
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
}

class Watermark {

    private watermarkConfig: WatermarkConfig;

    constructor(watermarkConfig: WatermarkConfig){
        this.watermarkConfig = Object.assign(defaultConfig, watermarkConfig);
        this.init();
        this._setAntiDeletion();
    }

    resetText(text: string) {
        this.watermarkConfig.text = text;
        this.init();
    }

    _setAntiDeletion() {
        let self = this;
        window.setInterval(function(){
            if (!document.getElementById(self.watermarkConfig.id + '-canvas')) {
                self.init();
            }
        }, this.watermarkConfig.duration);
    }

    init() {
        this.createCanvas();
        this.fill();
    }

    private createCanvas() {
        let containerNode: HTMLElement | null = document.getElementById(this.watermarkConfig.id);
        if (!containerNode) {
            this.watermarkConfig.supportTip = '无法定位水印节点';
            return
        }
        containerNode.style.cssText= containerNode.style.cssText + 'position: relative;';

        let width = containerNode.offsetWidth;
        let height = containerNode.offsetHeight;
        let canvas = document.createElement('canvas');
        canvas.setAttribute('id', this.watermarkConfig.id + '-canvas');
        canvas.innerHTML = this.watermarkConfig.supportTip;
        canvas.width = width * this.watermarkConfig.clarity;
        canvas.height = height * this.watermarkConfig.clarity;
        canvas.style.cssText= `position:absolute;width: 100%;height: 100%;left:0;top:0;z-index: ${this.watermarkConfig.zIndex}`;
        containerNode.appendChild(canvas);
    }

    private fill() {
        let reDunDance = 10;
        // @ts-ignore
        let canvas: HTMLCanvasElement | null = document.getElementById(this.watermarkConfig.id + '-canvas');
        let containerNode: HTMLElement | null = document.getElementById(this.watermarkConfig.id);
        if (!canvas || !containerNode ) {
            this.watermarkConfig.supportTip = '无法定位水印节点';
            return
        }
        let cxt: CanvasRenderingContext2D | null = canvas.getContext('2d');

        if (!cxt ) {
            this.watermarkConfig.supportTip = '无法定位水印节点';
            return
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




class MyHSlider extends eui.SliderBase {
    
        public label : eui.Label;
        public labelComp : eui.UIComponent;
        /**
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 构造函数。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        public constructor() {
            super();
        }
    
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected pointToValue(x:number, y:number):number {
            if (!this.thumb || !this.track)
                return 0;
            let values = this.$Range;
            let range = values[eui.sys.RangeKeys.maximum] - values[eui.sys.RangeKeys.minimum];
            let thumbRange = this.getThumbRange();
            let value = values[eui.sys.RangeKeys.minimum] + (thumbRange != 0 ? (x / thumbRange) * range : 0);
            return value;
        }
    
        /**
         * @private
         * 
         * @returns 
         */
        private getThumbRange():number {
            let bounds = egret.$TempRectangle;
            this.track.getLayoutBounds(bounds);
            let thumbRange = bounds.width;
            this.thumb.getLayoutBounds(bounds);
            return thumbRange - bounds.width;
        }
    
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected updateSkinDisplayList():void {
            if (!this.thumb || !this.track)
                return;
            let values = this.$Range;
            let thumbRange = this.getThumbRange();
            let range = values[eui.sys.RangeKeys.maximum] - values[eui.sys.RangeKeys.minimum];
            let thumbPosTrackX = (range > 0) ? ((this.pendingValue - values[eui.sys.RangeKeys.minimum]) / range) * thumbRange : 0;
            let thumbPos = this.track.localToGlobal(thumbPosTrackX, 0, egret.$TempPoint);
            let thumbPosX = thumbPos.x;
            let thumbPosY = thumbPos.y;
            let thumbPosParentX = this.thumb.$parent.globalToLocal(thumbPosX, thumbPosY, egret.$TempPoint).x;
    
            let bounds = egret.$TempRectangle;
            this.thumb.getLayoutBounds(bounds);
            this.thumb.setLayoutBoundsPosition(Math.round(thumbPosParentX), bounds.y);
            if (this.trackHighlight && this.trackHighlight.$parent) {
                let trackHighlightX = this.trackHighlight.$parent.globalToLocal(thumbPosX, thumbPosY, egret.$TempPoint).x - thumbPosTrackX;
                this.trackHighlight.x = Math.round(trackHighlightX);
                this.trackHighlight.width = Math.round(thumbPosTrackX);
            }
            if(this.label) {
                this.label.text = this.value.toString();
                if(this.labelComp) {
                    this.labelComp.setLayoutBoundsPosition(Math.round(thumbPosParentX), bounds.y - this.labelComp.height);
                }else if(this.label) {
                    this.label.setLayoutBoundsPosition(Math.round(thumbPosParentX), bounds.y - this.label.height);
                }
            }
            if(this.track instanceof eui.ProgressBar) {
                this.track.value = this.value;
            }
        }
    }
        
"use strict";

import {ColorData} from "./data-color";
import {AlphaCurveType} from "../enum/alpha-curve-type";

export class DrawingData {
	bgColor:string = "";
	width:number = 0.0;
	height:number = 0.0;

	/** 1秒あたりの発生数です。 */
	emitFrequency:number = 0;

	/** 発生基準位置 - X座標 (px)です。 */
	startX:number = 0;
	/** 発生基準位置 - X座標のばらつき (px)です。 */
	startXVariance:number = 0;

	/** 発生位置 - Y座標 (px)です。 */
	startY:number = 0;
	/** 発生位置 - Y座標のばらつき (px)です。 */
	startYVariance:number = 0;

	/** 初期速度 - 方向 (度)です。 */
	initialDirection:number = 0;
	/** 初期速度 - 方向のばらつき (度)です。 */
	initialDirectionVariance:number = 0;

	/** 初期速度 (px)です。 */
	initialSpeed:number = 0;
	/** 初期速度のばらつきです。 */
	initialSpeedVariance:number = 0;

	/** 回転計算の種類です。 */
	rotationMode:number = 0;
	/** 初期回転角度（度）です。 */
	initialRotation:number = 0;
	/** 初期回転角度（度）のばらつきです。 */
	initialRotationVariance:number = 0;

	/** 初期回転速度 (度)です。 */
	initialRotationSpeed:number = 0;
	/** 初期回転速度のばらつきです。 */
	initialRotationSpeedVariance:number = 0;

	/** 摩擦です。 */
	friction:number = 0;

	/** 重力です。 */
	accelerationSpeed:number = 0;
	/** 重力方向 (度)です。 */
	accelerationDirection:number = 0;

	/** 開始時のスケールです。 */
	startScale:number = 0;
	/** 開始時のスケールのばらつきです。 */
	startScaleVariance:number = 0;

	/** 終了時のスケールです。 */
	finishScale:number = 0;
	/** 終了時のスケールのばらつきです。 */
	finishScaleVariance:number = 0;

	/** ライフ(フレーム数)です。 */
	lifeSpan:number = 0;
	/** ライフのばらつき(フレーム数)です。 */
	lifeSpanVariance:number = 0;

	/** 開始時の透明度です。 */
	startAlpha:number = 0;
	/** 開始時の透明度のばらつきです。 */
	startAlphaVariance:number = 0;

	/** 終了時の透明度です。 */
	finishAlpha:number = 0;
	/** 終了時の透明度のばらつきです。 */
	finishAlphaVariance:number = 0;

	/** 使用するシェイプID設定です。 */
	shapeIdList:string[] = [""];

	/** 初期カラーの設定です。 */
	startColor:ColorData = new ColorData();

	/** シェイプを加算合成します。 */
	blendMode:boolean = true;

	/** 透明度の計算式の設定です。 */
	alphaCurveType:number = AlphaCurveType.Normal;

	constructor(json:any = null) {
		if (json) {
			this.importFromJson(json);
		}
	}

	static ENABLE_REFLECT:boolean = DrawingData.checkReflectEnable();

	/**
	 * パーティクルの設定をJSON形式のオブジェクトから読み込みます。
	 * @param json
	 */
	public importFromJson(obj:any):void {

		var checkSkipKey = (key:string) => {
			return key == "width" || key == "height" || key == "bgColor";
		}

		this.setData(obj, checkSkipKey);
	}

	/**
	 * パーティクルの設定をDrawingDataオブジェクトから読み込みます
	 * @param obj
	 */
	public importData(obj:DrawingData) {
		var checkSkipKey = (key:string)=> {
			return key == "width" || key == "height" || key == "startX" || key == "startY";
		}

		this.setData(obj, checkSkipKey);
	}

	static checkReflectEnable():boolean {
		try {
			var result = !!( Reflect && Reflect.has );
			return result;
		} catch (e) {
			return false;
		}
	}

	private setData(obj:any, checkSkipKey:(key:string)=>boolean):void {

		if (DrawingData.ENABLE_REFLECT) {
			for (let key in  obj) {
				// 無視するプロパティー
				if (checkSkipKey(key)) {
					continue;
				}
				if (Reflect.has(this, key) == true) {
					let val = <any> obj[key];
					// イマドキなプロパティー反映方法を適用 ICS-Ikeda 2016-01-22
					Reflect.set(this, key, val);
				}
			}
		} else {
			var self = <any>this;
			for (let key in obj) {
				// 無視するプロパティー
				if (checkSkipKey(key)) {
					continue;
				}
				if (this.hasOwnProperty(key)) {
					self[key] = obj[key];
				}
			}
		}
	}
}
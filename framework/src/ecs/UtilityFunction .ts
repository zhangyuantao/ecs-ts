module ecs {
	/**
	 * 实用函数
	 * 系统通过 UtilityFunction 调用想执行的方法，同系统一样， UtilityFunction 中不能存放状态，它应该是拥有各个方法的纯净集合
	 */
	export class UtilityFunction {
		public constructor() {
		}
	}

	/**
	 * 销毁对象
	 */
	export let destroy = (obj: any) => {
		obj.destroy && obj.destroy();
	}
}
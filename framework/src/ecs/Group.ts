module ecs {
	/**
	 * 根据Matcher匹配一组实体
	 * Group由Context管理并实时更新,使用context.GetGroup(matcher)获取一个组，如果存在相同matcher则返回存在group实例
	 */
	export class Group {
		private matcher: Matcher;
		private entities: { [key: number]: number };

		public constructor(matcher: Matcher) {
			let self = this;
			self.matcher = matcher;
		}


		private addEntity(entity: number, index: number, component: IComponent) {

		}

		private removeEntity(entity: number, index: number, component: IComponent) {

		}

		// Context管理更新
		public handleEntity(entity: number, index: number, component: IComponent, ctx: Context) {
			let self = this;
			if (self.matcher.matches(entity, ctx))
				self.addEntity(entity, index, component);
			else
				self.removeEntity(entity, index, component);
		}

		/**
		 * 获取最新的实体集合
		 */
		public getEntities() {

		}
	}
}
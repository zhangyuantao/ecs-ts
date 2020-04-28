module ecs {
	export class Matcher {
		private allOfIndices: number[];
		private anyOfIndices: number[];
		private noneOfIndices: number[];

		public destroy() {
			let self = this;
			self.allOfIndices = null;
			self.anyOfIndices = null;
			self.noneOfIndices = null;
		}

		// 拥有所有提供组件的实体
		public allOf(...indices: number[]) {
			let self = this;
			if (!self.allOfIndices)
				self.allOfIndices = [];

			for (let i = 0; i < indices.length; i++) {
				let idx = indices[i];
				let flag = self.allOfIndices.indexOf(idx);
				if (flag == -1)
					self.allOfIndices.push(idx);
			}

			return self;
		}

		// 包含任意提供组件的实体
		public anyOf(...indices: number[]) {
			let self = this;
			if (!self.anyOfIndices)
				self.anyOfIndices = [];

			for (let i = 0; i < indices.length; i++) {
				let idx = indices[i];
				let flag = self.anyOfIndices.indexOf(idx);
				if (flag == -1)
					self.anyOfIndices.push(idx);
			}

			return self;
		}

		// 不包含提供组件的实体
		public noneOf(...indices: number[]) {
			let self = this;
			if (!self.noneOfIndices)
				self.noneOfIndices = [];

			for (let i = 0; i < indices.length; i++) {
				let idx = indices[i];
				let flag = self.noneOfIndices.indexOf(idx);
				if (flag == -1)
					self.noneOfIndices.push(idx);
			}

			return self;
		}

		/**
		 * 检查实体是否满足组件匹配要求
		 */
		public matches(entity: number, ctx: Context) {
			let self = this;
			return (!self.allOfIndices || ctx.hasComponents(entity, self.allOfIndices))
				&& (!self.anyOfIndices || ctx.hasAnyComponent(entity, self.anyOfIndices))
				&& (!self.noneOfIndices || !ctx.hasAnyComponent(entity, self.noneOfIndices));
		}
	}
}
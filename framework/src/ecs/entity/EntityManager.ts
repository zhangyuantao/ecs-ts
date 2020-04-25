module ecs {
	/**
	 * 实体管理
	 * Created by zhangyt
	 */
	export class EntityManager {
		// 自增实体id
		private static EID: number = 0;

		// 组件缓存池
		private componentPool: Array<Array<IComponent>>;

		// 实体集合，key:实体id value:实体数据		
		private entities: { [key: number]: IEntity };

		// 实体拥有的组件，key:实体id value:组件列表		 
		private entityComponents: { [key: number]: Array<IComponent> };

		// 组件上限
		private maxComponents: number;

		// 已创建组件数量
		private componentCount: number;

		public constructor(maxComponents: number) {
			let self = this;
			EntityManager.EID = 0;
			self.maxComponents = maxComponents;
			self.componentPool = [];
			self.entities = {};
			self.entityComponents = {};
			self.componentCount = 0;
		}

		public destroy() {
			let self = this;
			self.maxComponents = 0;
			self.componentCount = 0;
			self.entities = null;
			self.entityComponents = null;
			self.componentPool = null;
		}

		/** Entity */

		private get newEntityId() {
			return EntityManager.EID++;
		}

		public getEntity(id: number) {
			let self = this;
			return self.entities[id];
		}

		public createEntity(name?: string) {
			let self = this;
			let entity = <IEntity>{};
			entity.id = self.newEntityId;
			entity.name = name ? name : `entity_${entity.id}`;
			self.addEntity(entity);
			return entity;
		}

		private addEntity(entity: IEntity) {
			let self = this;
			self.entities[entity.id] = entity;
		}

		public removeEntity(id: number) {
			let self = this;
			let entity = self.entities[id];
			if (entity) {
				delete self.entities[id];
				self.removeEntityComponents(id); // 移除它的组件列表
			}
			return self;
		}

		public removeAllEntities() {
			let self = this;
			for (let key in self.entities) {
				self.removeEntity(self.entities[key].id);
			}

			self.entities = null;
			self.componentPool = null;
			self.entityComponents = null
		}

		/** Component */

		// 获取指定类型组件，返回第一个匹配组件
		public getComponent(entityId: number, type: number): IComponent {
			let self = this;
			let coms = self.entityComponents[entityId];
			if (coms && coms.length > 0) {
				for (let i = 0; i < coms.length; i++) {
					if (coms[i].type == type)
						return coms[i];
				}
			}
			return null;
		}

		// 获取指定类型组件，返回所有匹配组件
		public getComponents(entityId: number, type: number): IComponent[] {
			let self = this;
			let result = [];
			let coms = self.entityComponents[entityId];
			if (coms) {
				for (let i = 0; i < coms.length; i++) {
					if (coms[i].type == type)
						result.push(coms[i]);
				}
			}
			return result;
		}

		// 实体添加组件
		public addComponent(entityId: number, type: number, newFunc: Function) {
			let self = this;
			if (!self.entityComponents[entityId])
				self.entityComponents[entityId] = new Array<IComponent>();
			let com = self.createComponent(type, newFunc);
			self.entityComponents[entityId].push(com);
			return self;
		}

		private createComponent(type: number, newFunc: Function) {
			let self = this;
			let cache = self.componentPool[type] && self.componentPool[type].pop();
			if (cache) {
				return cache;
			}
			else {
				if (self.componentCount >= self.maxComponents)
					throw "Max components reached.";
				self.componentCount++;
				return newFunc();
			}
		}

		// 移除第一个匹配的指定组件
		public removeComponent(entityId: number, type: number) {
			let self = this;
			let coms = self.entityComponents[entityId];
			if (coms) {
				for (let i = 0; i < coms.length; i++) {
					if (coms[i].type == type) {
						self.recycleComponent(coms[i]);
						coms.splice(i, 1);
						break;
					}
				}
			}
			return self;
		}

		// 移除匹配的一组组件
		public removeComponents(entityId: number, type: number) {
			let self = this;
			let coms = self.entityComponents[entityId];
			if (coms) {
				for (let i = 0; i < coms.length; i++) {
					if (coms[i].type == type) {
						self.recycleComponent(coms[i]);
						coms.splice(i--, 1);
					}
				}
			}
			return self;
		}

		// 移除实体上的所有组件
		public removeEntityComponents(entityId: number) {
			let self = this;
			let coms = self.entityComponents[entityId];
			if (coms) {
				for (let i = 0; i < coms.length; i++)
					self.recycleComponent(coms[i]);
				self.entityComponents[entityId] = [];
			}
			return self;
		}

		// 回收组件
		private recycleComponent(com: IComponent) {
			let self = this;
			if (!self.componentPool[com.type])
				self.componentPool[com.type] = new Array<IComponent>();
			self.componentPool[com.type].push(com);
		}
	}
}
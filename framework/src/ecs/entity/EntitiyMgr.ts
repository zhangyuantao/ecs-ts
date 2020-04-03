module ecs {
	/**
	 * Entity管理
	 * Created by zhangyt
	 */
	export class EntityManager {
		// 自增实体id
		private static EID: number = 0;

		// 存放所有组件数据
		private components: Array<IComponent>;

		// 实体集合，key:实体id value:实体数据		
		private entities: { [key: number]: IEntity };

		// 实体拥有的组件，key:实体id value:组件列表		 
		private entityComponents: { [key: number]: Array<IComponent> };

		public constructor() {
			let self = this;
			self.entities = {};
			self.components = [];
		}

		public destroy() {
			let self = this;
			self.entities = null;
			self.components = null;
		}

		/** Entity */

		private get newEntityId() {
			return EntityManager.EID++;
		}

		public createEntity(name?: string) {
			let self = this;
			let entity = <IEntity>{};
			entity.id = self.newEntityId;
			entity.name = name;
			self.addEntity(entity);
		}

		public addEntity(entity: IEntity) {
			let self = this;
			self.entities[entity.id] = entity;
		}

		public removeEntity(id: number) {
			let self = this;
			let entity = self.entities[id];
			if (entity) {
				delete self.entities[id];

				// 移除它的组件列表
				self.removeComponents(id);
			}
		}

		public removeAllEntities() {
			let self = this;
			for (let key in self.entities) {
				self.removeEntity(self.entities[key].id);
			}

			self.entities = null;
			self.components = null;
			self.entityComponents = null
		}

		/** Component */


		public getComponent<T>(entityId: number) {

		}

		public addComponent(entityId: number, com: IComponent) {

		}

		public removeAComponent(com: IComponent) {
			let self = this;
			let idx = self.components.indexOf(com);
			if (idx != -1) {
				self.components.splice(idx, 1);
				
				// 组件移除事件
			}
		}

		public removeComponent<T>(entityId: number) {

		}

		public removeComponents(entityId: number) {
			let self = this;
			let arr = self.entityComponents[entityId];

			for (let i = 0; i < arr.length; ++i) {
				self.removeAComponent(arr[i]);
			}

			delete self.entityComponents[entityId];
		}
	}
}
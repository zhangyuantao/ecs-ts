namespace ecs.example {
    export class ECSExample {
        public context: ecs.Context;
        public lifecycle: egret.lifecycle.LifecycleContext;

        public constructor() {
            let self = this;
            egret.lifecycle.addLifecycleListener((lifecycle) => {
                self.lifecycle = lifecycle;
                lifecycle.onUpdate = () => {
                    self.context.update(egret.getTimer());
                    console.log("lifecycle-onUpdate");
                }
            });


            egret.lifecycle.onPause = () => {
                self.context.pause();
                egret.ticker.pause();
                console.log("lifecycle-onPause");
            };

            egret.lifecycle.onResume = () => {
                self.context.resume();
                egret.ticker.resume();
                console.log("lifecycle-onResume");
            };

            self.context = new ecs.Context();
            // self.context.systems
            // .add({})
            // .add({})
            // .add({});            
            self.context.initialize();
            let entity = self.context.entities.createEntity("player");
            self.context.entities
            .addComponent(entity.id, <IComponent>{})
            .addComponent(entity.id, <IComponent>{})
        }

        public dispose() {
            let self = this;
            self.context.destroy();
            
            let idx = egret.lifecycle.contexts.indexOf(self.lifecycle);
            idx != -1 && egret.lifecycle.contexts.splice(idx, 1);
            self.lifecycle = null;
        }
    }
}
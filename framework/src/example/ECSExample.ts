namespace ecs.example {
    export class ECSExample {
        public world: ecs.World;
        public lifecycle: egret.lifecycle.LifecycleContext;

        public constructor() {
            let self = this;
            egret.lifecycle.addLifecycleListener((lifecycle) => {
                self.lifecycle = lifecycle;
                lifecycle.onUpdate = () => {
                    self.world.update(egret.getTimer());
                }
            });


            egret.lifecycle.onPause = () => {
                self.world.pause();
                egret.ticker.pause();
                console.log("lifecycle-onPause");
            };

            egret.lifecycle.onResume = () => {
                self.world.resume();
                egret.ticker.resume();
                console.log("lifecycle-onResume");
            };

            self.world = new ecs.World("default");
            self.world.systems.add(new MoveSystem());
            self.world.initialize();
            let entity = self.world.context.createEntity();
            self.world.context.addComponent(entity, Components.MoveComponent, () => {
                return <IMoveComponent>{
                    type: Components.MoveComponent,
                    x: 0,
                    y: 0,
                    rotation: 0
                }
            });

        }

        public dispose() {
            let self = this;
            self.world.destroy();

            let idx = egret.lifecycle.contexts.indexOf(self.lifecycle);
            idx != -1 && egret.lifecycle.contexts.splice(idx, 1);
            self.lifecycle = null;
        }
    }
}
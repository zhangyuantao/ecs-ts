namespace ecs.example {
    export class ECSExample {
        public gameCtrl: ecs.example.GameCtrl;
        public lifecycle: egret.lifecycle.LifecycleContext;

        public constructor() {
            let self = this;
            egret.lifecycle.addLifecycleListener((lifecycle) => {
                self.lifecycle = lifecycle;
                lifecycle.onUpdate = () => {
                    self.gameCtrl.update(egret.getTimer());
                }
            });


            egret.lifecycle.onPause = () => {
                self.gameCtrl.pause();
                egret.ticker.pause();
                console.log("lifecycle-onPause");
            };

            egret.lifecycle.onResume = () => {
                self.gameCtrl.resume();
                egret.ticker.resume();
                console.log("lifecycle-onResume");
            };

            self.gameCtrl = new ecs.example.GameCtrl(Contexts.instance, true);
            self.gameCtrl.addSystem(new MoveSystem(Contexts.instance));
            self.gameCtrl.initialize();

            let entity = Contexts.instance.game.createEntity();
            Contexts.instance.game.addComponent(entity, Components.MoveComponent, () => {
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
            Contexts.instance.destroy();
            self.gameCtrl.destroy();

            let idx = egret.lifecycle.contexts.indexOf(self.lifecycle);
            idx != -1 && egret.lifecycle.contexts.splice(idx, 1);
            self.lifecycle = null;
        }
    }
}
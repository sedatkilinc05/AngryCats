import 'regenerator-runtime/runtime'
import { scene, engine } from './src/scene'
import Ammo from "ammojs-typed";
import { AmmoJSPlugin, Vector3 } from 'babylonjs';
import { makeGround } from "./src/ground";

import { makeBox, makeCube } from "./src/cube";

async function main(): Promise<void> {
    console.log('Hello from Babylons>JS')
    window.addEventListener('keydown', (ev: KeyboardEvent) => {
        // Shift+Ctrl+Alt+I
        console.log('[Falling Cubes] keydown', ev, ev.shiftKey, ev.ctrlKey, ev.altKey, ev.key);
        if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === 'KeyI') {
            console.log('[Falling Cubes] Shift+Ctrl+Alt+I pressed');
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            } else {
                scene.debugLayer.show();
            }
        }
    })

    const ammo = await Ammo()
    const physics: AmmoJSPlugin = new AmmoJSPlugin(true, ammo)
    scene.enablePhysics(new Vector3(0, -9.81, 0), physics)

    makeGround(28)
    makeCube()
    makeCube(-4, 2, -4, 0.25)
    makeCube(-2, 2, -2, 0.25)
    makeCube(-1, 2, -1, 0.25)
    makeCube(4, 2, 4, 0.25)
    makeCube(2, 2, 2, 0.25)
    makeCube(1, 2, 1, 0.25)

    makeBox(-4, 2, 4)
    makeBox(-3, 2, 3)
    makeBox(-2, 2, 2)
    makeBox(-1, 2, 1)
    makeBox()
    makeBox(0.5, 2, 0, 3, 3, 0.1)
    makeBox(3, 2, -3)
    makeBox(2, 2, -2)
    makeBox(1, 2, -1)
    engine.runRenderLoop(() => {
        scene.render()
    })
}

main()

import 'regenerator-runtime/runtime'
import { scene, engine, camera } from './src/scene'
import Ammo from "ammojs-typed";
import { AmmoJSPlugin, Mesh, Vector3 } from 'babylonjs';
import { makeGround } from "./src/ground";

import { makeBox, makeCube, makeArc } from "./src/cube";

import { addDebugLayer } from "./src/debuglayer";

let ground: Mesh

async function main(): Promise<void> {
    console.log('Hello from Babylons>JS')

    addDebugLayer();

    const ammo = await Ammo()
    const physics: AmmoJSPlugin = new AmmoJSPlugin(true, ammo)
    scene.enablePhysics(new Vector3(0, -9.81, 0), physics)

    ground = makeGround(28, 4)
    ground.receiveShadows = true

    makeCube()
    makeCube(-4, 2, -44, 0.25)
    makeCube(-2, 2, -32, 0.25)
    makeCube(-1, 2, -41, 0.25)
    /* makeCube(4, 2, 4, 0.25)
    makeCube(2, 2, 2, 0.25)
    makeCube(1, 2, 1, 0.25)

    makeBox(-4, 12, 4)
    makeBox(-3, 12, 3)
    makeBox(-2, 12, 2)
    makeBox(-1, 12, 1)
    makeBox() */
    makeBox(0.5, 12, -20, 13, .3, 0.1)
    makeBox(3, -40, -3)
    makeBox(2, -40, -2)
    makeBox(1, -40, -1)

    makeBox(0, 13, -23, 3, 3, 0.1)

    // 4th Row
    makeArc(-9, -50, 5, 5)

    makeArc(-2, -50, 5, 5)

    makeArc(4, -50, 5, 5)

    // 3rd Row
    makeArc(-9, -40, 5, 5)

    makeArc(-2, -40, 5, 5)

    makeArc(4, -40, 5, 5)

    // 2nd Row
    makeArc(-9, -30, 5, 5)

    makeArc(-2, -30, 5, 5)

    makeArc(4, -30, 5, 5)

    // 1st row
    makeArc(-9, -20, 5, 5)

    makeArc(-2, -20, 5, 5)

    makeArc(4, -20, 5, 5)



    let gun: Mesh = makeBox(0, 3, 43, 1, 1, 5)
    gun.physicsImpostor?.setMass(0)

    engine.runRenderLoop(() => {
        scene.render()
    })

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    })
}

main()



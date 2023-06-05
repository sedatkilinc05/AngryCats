import 'regenerator-runtime/runtime'
import { scene, engine, camera, createUniversalCamera, shadowGenerator } from './src/scene'
import Ammo from "ammojs-typed";
import { AmmoJSPlugin, Mesh, PhysicsImpostor, Scene, SceneLoader, UniversalCamera, Vector3 } from 'babylonjs';
import { makeGround } from "./src/ground";

import { makeBox, makeCube, makeArc } from "./src/cube";

import { addDebugLayer } from "./src/debuglayer";
import { canvas } from './src/domitems';

import urlDude from "./src/models/Dude/Dude.babylon"
// import { AdvancedDynamicTexture, Button } from "@babylonjs/gui";
import { getDudeByName, makeDude } from './src/dude';

let ground: Mesh
let universalCamera: UniversalCamera
let bullet: Mesh

async function main(): Promise<void> {
    console.log('Hello from Babylons>JS')

    addDebugLayer();

    const ammo = await Ammo()
    const physics: AmmoJSPlugin = new AmmoJSPlugin(true, ammo)
    scene.enablePhysics(new Vector3(0, -9.81, 0), physics)

    ground = makeGround(28, 4)
    ground.receiveShadows = true

    /*  makeCube()
     makeCube(-4, 2, -44, 0.25)
     makeCube(-2, 2, -32, 0.25)
     makeCube(-1, 2, -41, 0.25) */
    /* makeCube(4, 2, 4, 0.25)
    makeCube(2, 2, 2, 0.25)
    makeCube(1, 2, 1, 0.25)

    makeBox(-4, 12, 4)
    makeBox(-3, 12, 3)
    makeBox(-2, 12, 2)
    makeBox(-1, 12, 1)
    makeBox() */
    /*  makeBox(0.5, 12, -20, 13, .3, 0.1)
     makeBox(3, -40, -3)
     makeBox(2, -40, -2)
     makeBox(1, -40, -1)
 
     makeBox(0, 13, -23, 3, 3, 0.1) */

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
    makeDude('JoeT', 0, 6, -20, 0.1, 0.1)

    let x = 0
    let y = 2
    let z = -3

    let scale = 0.3

    let restitution = 0.1
    makeDude('JoeL', 7, 0, -3, 0.1, 0.1)
    makeDude('Joe', 0, 0, -3, 0.1, 0.1)
    makeDude('JoeR', -7, 0, -3, 0.1, 0.1)

    let dudeJoe = getDudeByName('Joe')
    console.log('Here  is Joe', dudeJoe)
    /* 
    SceneLoader.ImportMesh("", urlDude, "", scene,
        function (meshes, particleSystems, skeletons) {
            let skeleton = skeletons[0]
            let dude = <Mesh>meshes[0]
            // dude.physicsImpostor = new PhysicsImpostor(
            //     dude,
            //     PhysicsImpostor.MeshImpostor,
            //     { mass: 1, restitution: restitution },
            //     scene
            // )
            console.log('meshes', meshes)
            dude.scaling = new Vector3(scale, scale, scale)
            dude.position = new Vector3(x, y, z)
            // mesh.rotation.y += Math.PI

            shadowGenerator.addShadowCaster(dude)
            console.log('Dude', dude)
        }
    )
 */
    const gun: Mesh = makeBox(0, 3, 43, 1, 1, 5)
    gun.physicsImpostor?.setMass(0)
    universalCamera = createUniversalCamera(0, 5, 50, new Vector3(0, 6, -40))

    bullet = makeCube(0, 4, 42, 1, 0.9)
    /* 
    let btn1 = Button.CreateSimpleButton("", "Button one");
    btn1.width = "100px";
    btn1.height = "30px"
    btn1.background = "white"
    btn1.verticalAlignment = 1;
    btn1.horizontalAlignment = 0;
    btn1.left = "15px";
    btn1.top = "-15px";

    let btn2 = Button.CreateSimpleButton("", "Button two");
    btn2.width = "100px";
    btn2.height = "30px"
    btn2.background = "white"
    btn2.verticalAlignment = 1;
    btn2.horizontalAlignment = 0;
    btn2.left = "130px"
    btn2.top = "-15px";

    btn1.onPointerClickObservable.add(() => {
        camera.detachControl()
        scene.activeCamera = universalCamera
    })

    btn2.onPointerClickObservable.add(() => {
        universalCamera.detachControl()
        scene.activeCamera = camera

    })

    advancedTexture.addControl(btn1);
    advancedTexture.addControl(btn2);
 */
    engine.runRenderLoop(() => {
        scene.render()
        let dude = getDudeByName('Joe')
        if (dude != undefined) {
            dude.rotation.y += deg2rad(5)
        }
    })

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    }, false)
    window.addEventListener("keyup", function (ev: KeyboardEvent) {
        console.log(ev)
        if (ev.code == 'KeyU') {
            camera.detachControl()
            scene.activeCamera = universalCamera
            universalCamera.attachControl(canvas, true)
        } else if (ev.code == 'KeyC') {
            universalCamera.detachControl()
            scene.activeCamera = camera
            camera.attachControl(canvas, true)
        } else if (ev.code == 'Space') {
            physics.applyForce(bullet.physicsImpostor!, new Vector3(0, 1100, -1024), bullet.position)
            this.setTimeout(() => {
                bullet = makeCube(0, 4, 42, 1, 0.9)
            }, 1000)

        }
    }, false)
}

function deg2rad(deg: number): number {
    return Math.PI * deg / 180
}

main()
import { ArcRotateCamera, Color4, Engine, HemisphericLight, Scene, Vector3 } from "babylonjs"
import { canvas } from "./domitems"

const engine = new Engine(canvas, true)
const scene = makeScene()

function makeScene(): Scene {
    const scene = new Scene(engine)
    createCamera(scene)
    createLight(scene)
    setBackground(scene)

    return scene
}

function createCamera(scene: Scene): void {
    const alpha: number = Math.PI / 4
    const beta: number = Math.PI / 3
    const radius: number = 8
    const target: Vector3 = new Vector3(0, 0, 0)

    new ArcRotateCamera(
        "Camera",
        alpha,
        beta,
        radius,
        target,
        scene
    ).attachControl(canvas, true)
}

function createLight(scene: Scene): void {
    new HemisphericLight("Light", new Vector3(1, 1, 0), scene)
}


function setBackground(scene: Scene): void {
    const color4Black = new Color4(0, 0, 0, 1)
    scene.clearColor = color4Black
}

export { engine, scene }
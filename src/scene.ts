import { ArcRotateCamera, Color4, DirectionalLight, Engine, PointLight, Scene, ShadowGenerator, UniversalCamera, Vector3 } from "babylonjs"
import { canvas } from "./domitems"

const engine = new Engine(canvas, true)
const scene = makeScene()
const camera = createCamera(scene)
const light = createLight(scene)
const shadowGenerator = new ShadowGenerator(1024, light);

function makeScene(): Scene {
    const scene = new Scene(engine)
    createLight(scene)
    setBackground(scene)

    return scene
}

function createCamera(scene: Scene): ArcRotateCamera {
    const alpha: number = Math.PI / 2
    const beta: number = Math.PI * 75 / 180
    const radius: number = 3 * 28
    const target: Vector3 = new Vector3(0, 0, -10)

    let arcRotateCam: ArcRotateCamera = new ArcRotateCamera(
        "Camera",
        alpha,
        beta,
        radius,
        target,
        scene
    )

    arcRotateCam.attachControl(canvas, true)
    return arcRotateCam
}
function createUniversalCamera(x: number = 0, y: number = 1, z: number = 0, target = new Vector3(0, 0, 0)): UniversalCamera {
    let universalCamera = new UniversalCamera("UniversalCamera", new Vector3(x, y, z), scene)
    universalCamera.setTarget(target)

    return universalCamera
}

function createLight(scene: Scene): PointLight {
    const pointLight = new PointLight("Light", new Vector3(0, 55, 0), scene)
    return pointLight
}

function createDirectionalLight(scene: Scene): DirectionalLight {
    const directionalLight = new DirectionalLight("Light", new Vector3(0, -1, 0), scene)
    directionalLight.position = new Vector3(0, 15, 0)
    return directionalLight
}


function setBackground(scene: Scene): void {
    const color4Black = new Color4(0, 0, 0, 1)
    scene.clearColor = color4Black
    // scene.ambientColor = new Color3(1, 0, 0)
}

export { engine, scene, camera, shadowGenerator }
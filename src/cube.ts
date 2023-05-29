import { Mesh, MeshBuilder, PhysicsImpostor, Vector3 } from "babylonjs";
import { scene } from "./scene"

let counter = 0

function makeCube(x: number = 0, y: number = 1, z: number = 0, size: number = 0.5): Mesh {
    counter++
    const cube: Mesh = MeshBuilder.CreateBox("Cube" + counter, { size: size })
    cube.position = new Vector3(x, y, z)

    cube.physicsImpostor = new PhysicsImpostor(
        cube,
        PhysicsImpostor.BoxImpostor,
        { mass: 1, restitution: 0.9 },
        scene
    )

    return cube
}

function makeBox(x: number = 0, y: number = 1, z: number = 0, width: number = 0.5, height: number = 0.5, depth: number = 0.5): Mesh {
    counter++
    const cube: Mesh = MeshBuilder.CreateBox("Box" + counter, { width: width, height: height, depth: depth })
    cube.position = new Vector3(x, y, z)

    cube.physicsImpostor = new PhysicsImpostor(
        cube,
        PhysicsImpostor.BoxImpostor,
        { mass: 1, restitution: 0.9 },
        scene
    )

    return cube
}

export { makeCube, makeBox }
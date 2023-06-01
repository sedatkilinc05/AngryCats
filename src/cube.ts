import { Color3, Mesh, MeshBuilder, PhysicsImpostor, StandardMaterial, Vector3 } from "babylonjs";
import { scene, shadowGenerator } from "./scene"

let counter = 0

function makeCube(x: number = 0, y: number = 1, z: number = 0, size: number = 0.5, restitution: number = 0.1): Mesh {
    counter++
    const cube: Mesh = MeshBuilder.CreateBox("Cube" + counter, { size: size })
    cube.position = new Vector3(x, y, z)

    const tmpMaterial = new StandardMaterial("CubeMaterial" + counter, scene)
    tmpMaterial.diffuseColor = new Color3(Math.random(), Math.random(), Math.random())
    cube.material = tmpMaterial

    shadowGenerator.addShadowCaster(cube)

    cube.physicsImpostor = new PhysicsImpostor(
        cube,
        PhysicsImpostor.BoxImpostor,
        { mass: 1, restitution: restitution },
        scene
    )

    return cube
}

function makeBox(x: number = 0, y: number = 1, z: number = 0, width: number = 0.5, height: number = 0.5, depth: number = 0.5): Mesh {
    counter++
    const box: Mesh = MeshBuilder.CreateBox("Box" + counter, { width: width, height: height, depth: depth })
    box.position = new Vector3(x, y, z)

    const tmpMaterial = new StandardMaterial("BoxMaterial" + counter, scene)
    tmpMaterial.diffuseColor = new Color3(Math.random(), Math.random(), Math.random())
    box.material = tmpMaterial

    shadowGenerator.addShadowCaster(box)
    box.physicsImpostor = new PhysicsImpostor(
        box,
        PhysicsImpostor.BoxImpostor,
        { mass: 1, restitution: 0.9 },
        scene
    )

    return box
}

function makeArc(x: number = -10, z: number = -6, height: number = 5, width: number = 21) {
    // 3nd Arc
    // Column left
    makeCube(x, 0, z, 1)
    makeCube(x, 1, z, 1)
    makeCube(x, 2, z, 1)
    makeCube(x, 3, z, 1)
    makeCube(x, 4, z, 1)

    // Column right
    makeCube(x + width - 1, 0, z, 1)
    makeCube(x + width - 1, 1, z, 1)
    makeCube(x + width - 1, 2, z, 1)
    makeCube(x + width - 1, 3, z, 1)
    makeCube(x + width - 1, 4, z, 1)

    // horizontal
    makeBox(x + width / 2 - 0.5, 5, z, width, 1, 1)
}

export { makeCube, makeBox, makeArc }
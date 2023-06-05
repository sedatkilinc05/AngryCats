import { CreateGround, Mesh, PhysicsImpostor, StandardMaterial, Texture } from "babylonjs"
import { scene } from "./scene"
import pathImageGroundTexture from "../assets/ground.jpg"

function makeGround(size: number = 4, factor: number = 1): Mesh {
    const ground = CreateGround("Ground",
        { width: size, height: factor * size },
        scene
    )

    const materialGround = new StandardMaterial("materialGround", scene)
    // materialGround.diffuseColor = new Color3(1, 0, 0)
    const textureGround = new Texture(pathImageGroundTexture, scene)
    textureGround.uScale = 6
    textureGround.vScale = 6
    materialGround.diffuseTexture = textureGround

    ground.material = materialGround

    ground.physicsImpostor = new PhysicsImpostor(
        ground,
        PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.9 },
        scene
    )
    return ground
}

export { makeGround }
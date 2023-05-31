import { CreateGround, Mesh, PhysicsImpostor } from "babylonjs";
import { scene } from "./scene"

function makeGround(size: number = 4): Mesh {
    const ground = CreateGround("Ground",
        { width: size, height: 2 * size },
        scene
    )
    ground.physicsImpostor = new PhysicsImpostor(
        ground,
        PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.9 },
        scene
    )
    return ground
}

export { makeGround }
import { Matrix, Mesh, MeshBuilder, PhysicsImpostor, SceneLoader, Tags, TransformNode, Vector3 } from "babylonjs"
import { scene, shadowGenerator } from "./scene"

import urlDude from "./models/Dude/Dude.babylon"

let arrDudes: string[] = []

function makeDude(name: string, x: number = 0, y: number = 1, z: number = 0, scale: number = 0.5, restitution: number = 0.1, tag: string = 'dude') {
    // collision mesh
    const outer: Mesh = MeshBuilder.CreateBox("outer", { width: 25 * scale, depth: 10 * scale, height: 70 * scale }, scene)
    outer.isVisible = false
    outer.isPickable = false
    // outer.checkCollisions = true
    //move origin of box collider to the bottom of the mesh (to match imported player mesh)
    outer.bakeTransformIntoVertices(Matrix.Translation(0, 35 * scale, 0))

    //for collisions
    outer.position = new Vector3(x, y, z)
    outer.ellipsoidOffset = new Vector3(0, 35 * scale, 0)

    outer.physicsImpostor = new PhysicsImpostor(
        outer,
        PhysicsImpostor.BoxImpostor,
        { mass: 1, restitution: restitution },
        scene
    )

    let retValueImportMesh = SceneLoader.ImportMesh("", urlDude, "", scene,
        function (meshes, particleSystems, skeletons) {
            let skeleton = skeletons[0]
            let mesh = <Mesh>meshes[0]

            mesh.scaling = new Vector3(scale, scale, scale)

            // [parent] -> [child] relationships
            // [neck bone] -> [CoT (Center of transformation)] -> [fps camera]
            const neckBone = skeleton.bones[7];
            const CoT = new TransformNode("root");
            CoT.attachToBone(neckBone, mesh);


            console.log('Mesh set', mesh)

            mesh.parent = outer
            mesh.isPickable = true
            mesh.getChildMeshes().forEach(m => {
                m.isPickable = false;
            })
            console.log(meshes)


            shadowGenerator.addShadowCaster(mesh)

            Tags.EnableFor(outer)
            Tags.EnableFor(neckBone)
            Tags.EnableFor(CoT)

            outer.name = name
            neckBone.name = name + "NeckBone"
            CoT.name = name + "CoT"

            Tags.AddTagsTo(outer, tag)
            Tags.AddTagsTo(neckBone, 'NeckBone')
            Tags.AddTagsTo(CoT, 'CoT')

            console.log('Mesh set', Tags.MatchesQuery(outer, tag) ? 'matches ' + tag : 'no match for ' + tag)
            arrDudes.push(name)

            // mesh.dispose()
        }
    )
    console.log('After SceneLoader.ImportMesh', retValueImportMesh)
}

function getDudeByName(name: string): Mesh {
    return <Mesh>scene.getMeshByName(name)
}

function getDudeNeckBoneByName(name: string): Mesh {
    return <Mesh>scene.getMeshByName(name + "NeckBone")
}


function getNeckBones(tag: string = 'NeckBone'): Mesh[] {
    return <Mesh[]>scene.getMeshesByTags(tag)
}


function getDudesByTag(tag: string): Mesh[] {
    return <Mesh[]>scene.getMeshesByTags(tag)
}

export { makeDude, getDudeByName, getDudesByTag, getNeckBones, getDudeNeckBoneByName }
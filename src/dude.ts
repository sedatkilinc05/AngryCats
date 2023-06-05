import { Mesh, MeshBuilder, PhysicsImpostor, SceneLoader, Tags, Vector3 } from "babylonjs";
import { scene, shadowGenerator } from "./scene";

import urlDude from "./models/Dude/Dude.babylon"

let arrDudes: string[] = []

function makeDude(name: string, x: number = 0, y: number = 1, z: number = 0, scale: number = 0.5, restitution: number = 0.1, tag: string = 'dude') {
    console.log('Mesh declared')
    let retValueImportMesh = SceneLoader.ImportMesh("", urlDude, "", scene,
        function (meshes, particleSystems, skeletons) {
            let skeleton = skeletons[0]
            let mesh = <Mesh>meshes[0]
            console.log('Mesh set', mesh)

            console.log(meshes)
            mesh.scaling = new Vector3(scale, scale, scale)
            mesh.position = new Vector3(x, y, z)
            // mesh.rotation.y += Math.PI
            // mesh.physicsImpostor = new PhysicsImpostor(
            //     mesh,
            //     PhysicsImpostor.BoxImpostor,
            //     { mass: 0, restitution: restitution },
            //     scene
            // )

            shadowGenerator.addShadowCaster(mesh)

            Tags.EnableFor(mesh)
            mesh.name = name
            console.log('Mesh tags enabled', mesh)
            Tags.AddTagsTo(mesh, tag)

            console.log('Mesh set', Tags.MatchesQuery(mesh, tag) ? 'matches ' + tag : 'no match for ' + tag)
            arrDudes.push(tag)

            // mesh.dispose()
        }
    )
    console.log('After SceneLoader.ImportMesh', retValueImportMesh)
}
function loadMesh(name: string, x: number = 0, y: number = 1, z: number = 0, scale: number = 0.5, restitution: number = 0.1, tag: string = 'dude'): Promise<Mesh> {
    new Promise((resolve, reject) => {
        SceneLoader.ImportMesh("", urlDude, "", scene,
            function (meshes, particleSystems, skeletons) {
                let skeleton = skeletons[0]
                let mesh = <Mesh>meshes[0]
                console.log('Mesh set', mesh)

                console.log(meshes)
                mesh.scaling = new Vector3(scale, scale, scale)
                mesh.position = new Vector3(x, y, z)
                // mesh.rotation.y += Math.PI

                shadowGenerator.addShadowCaster(mesh)

                Tags.EnableFor(mesh)
                mesh.name = name
                console.log('Mesh tags enabled', mesh)
                Tags.AddTagsTo(mesh, tag)

                console.log('Mesh set', Tags.MatchesQuery(mesh, tag) ? 'matches ' + tag : 'no match for ' + tag)
                arrDudes.push(tag)
                if (Tags.MatchesQuery(mesh, tag)) {
                    resolve(mesh)
                } else {
                    let xy = MeshBuilder.CreateSphere("ball")
                    reject(xy)
                }
            }
        )
    })
}

async function makeDudeAsync(name: string, x: number = 0, y: number = 1, z: number = 0, scale: number = 0.5, restitution: number = 0.1, tag: string = 'dude'): Mesh {
    let mesh = await loadMesh(name, x, y, z, scale, restitution, tag)
    return mesh
}

async function getMeshByName(name: string): Promise<any> {
    return new Promise(resolve => {
        resolve(<Mesh>scene.getMeshByName(name))
    })
}

async function getDudeByNameAsync(name: string): Mesh {
    return await getMeshByName(name)
}

function getDudeByName(name: string): Mesh {
    return <Mesh>scene.getMeshByName(name)
}


function getDudesByTag(tag: string): Mesh[] {
    return <Mesh[]>scene.getMeshesByTags(tag)
}

export { makeDude, getDudeByName, getDudesByTag, makeDudeAsync }
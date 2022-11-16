import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

export default class Spheres {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.CircleGeometry(5, 64)
    }

    setTextures() {
        this.textures = {}

        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}


// Spheres
// const sphereGroup = new THREE.Group()
// const sphereGeometry = new THREE.SphereGeometry(.2, 20, 20)
// for(let i = 0; i < params.spheresAmount; i++){
//     const sphere = new THREE.Mesh(
//         sphereGeometry,
//         new THREE.MeshMatcapMaterial({
//             matcap: matcapTexture2,
//             color: new THREE.Color("#"+genHex(6))
//         })
//     )
//     // sphere.material.color = new THREE.Color("rgb(159, 1, 134)")
//     sphere.position.x = (Math.random() - 0.5) * 10
//     sphere.position.y = (Math.random() - 0.5) * 10
//     sphere.position.z = (Math.random() - 0.5) * 10
//     sphere.rotation.x = Math.random() * Math.PI
//     sphere.rotation.y = Math.random() * Math.PI
//     const scale = Math.random()
//     sphere.scale.set(scale, scale, scale)
//     sphereGroup.add(sphere)
// }

// scene.add(sphereGroup)

// let spherePositions = sphereGroup.children.map(i => i.position)
// gsap.to(spherePositions, {
//     x: Math.cos(100),
//     y: Math.sin(100),
//     z: Math.sin(100),
//     duration: 25,
//     yoyo: true,
//     repeat: -1,
//     stagger: 0.01,
//     ease: "back.inOut(1.7)",
//     repeatDelay: 8
// })
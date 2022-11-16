import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

export default class Donuts {
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


let genHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

// Donuts
// const donutGroup = new THREE.Group()
// const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
// for(let i = 0; i < params.donutsAmount; i++){
//     const donut = new THREE.Mesh(
//         donutGeometry,
//         new THREE.MeshNormalMaterial({
//             wireframe: true
//         })
//     )
//     donut.position.x = (Math.random() - 0.5) * 10
//     donut.position.y = (Math.random() - 0.5) * 10
//     donut.position.z = (Math.random() - 0.5) * 10
//     donut.rotation.x = Math.random() * Math.PI
//     donut.rotation.y = Math.random() * Math.PI
//     const scale = Math.random()
//     donut.scale.set(scale, scale, scale)
//     donutGroup.add(donut)
// }

// scene.add(donutGroup)


// let donutPositions = donutGroup.children.map(i => i.position)
// gsap.to(donutPositions, {
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
// let donutScales = donutGroup.children.map(i => i.scale)
// gsap.to(donutScales, {
//     x: 0.5,
//     y: 0.5,
//     z: 0.5,
//     duration: 25,
//     yoyo: true,
//     repeat: -1,
//     stagger: 0.01,
//     ease: "back.inOut(1.7)",
//     repeatDelay: 8
// })
// let donutRotations = donutGroup.children.map(i => i.rotation)
// gsap.to(donutRotations, {
//     x: Math.PI * 4,
//     duration: 20,
//     yoyo: true,
//     repeat: -1,
//     ease: "power1.inOut()",
// })
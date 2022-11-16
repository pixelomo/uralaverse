import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

export default class Diamonds {
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


// Diamonds
// const octGroup = new THREE.Group()
// const octGeometry = new THREE.OctahedronGeometry(.2)
// for(let i = 0; i < params.diamondAmount; i++){
//     const oct = new THREE.Mesh(
//         octGeometry,
//         new THREE.MeshStandardMaterial({
//             color: new THREE.Color("#"+genHex(6)),
//         })
//     )
//     oct.position.x = (Math.random() - 0.5) * 10
//     oct.position.y = (Math.random() - 0.5) * 10
//     oct.position.z = (Math.random() - 0.5) * 10
//     oct.rotation.x = Math.random() * Math.PI
//     oct.rotation.y = Math.random() * Math.PI
//     const scale = Math.random() * 1.25
//     oct.scale.set(scale, scale, scale)
//     octGroup.add(oct)
// }

// scene.add(octGroup)

// let diamondPositions = octGroup.children.map(i => i.position)
// gsap.to(diamondPositions, {
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
// let diamondRotations = octGroup.children.map(i => i.rotation)
// gsap.to(diamondRotations, {
//     x: Math.PI * 8,
//     duration: 20,
//     yoyo: true,
//     repeat: -1,
//     ease: "power1.inOut()",
// })
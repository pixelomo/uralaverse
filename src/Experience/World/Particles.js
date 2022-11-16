import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Particles {
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

 /**
    // Particles
    */
    //
    // const particleTexture = textureLoader.load('/textures/particles/1.png')
    // const particlesGeometry = new THREE.BufferGeometry()
    // const count = params.particleCount

    // const positions = new Float32Array(count * 3)
    // const colors = new Float32Array(count * 3)

    // for(let i = 0; i < count * 3; i++){
    //     positions[i] = (Math.random() - 0.5) * 20
    //     colors[i] = Math.random()
    // }

    // particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    // particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // const particlesMaterial = new THREE.PointsMaterial({
    //     size: 0.1,
    //     sizeAttenuation: true,
    //     // color: '#f7f1aa',
    //     map: particleTexture,
    //     transparent: true,
    //     alphaMap: particleTexture,
    //     // alphaTest: 0.5
    //     // depthTest: false
    //     depthWrite: false,
    //     blending: THREE.AdditiveBlending,
    //     vertexColors: true
    // })

    // const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    // scene.add(particles)
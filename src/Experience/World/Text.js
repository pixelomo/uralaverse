import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export default class Text {
    constructor(text, size, color, position, name) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.raycaster = this.experience.raycaster
        this.resources = this.experience.resources
        this.setGeometry(text, size)
        this.setMaterial(color)
        this.setMesh(position, name)
    }

    setGeometry(text, size) {
        this.geometry = new TextGeometry(
            text, {
                font: this.resources.items.mainFont,
                size: size,
                height: 0.16,
                // curveSegments: 5,
                // bevelEnabled: true,
                // bevelSize: 0.01,
                // bevelThickness: 0.03,
                // bevelOffset: 0,
                // bevelSegments: 1
            }
        )
        this.geometry.center()
    }

    setMaterial(color) {
        this.material = new THREE.MeshStandardMaterial({ color: color })
    }

    setMesh(position, name) {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(position.x, position.y, position.z)
        gsap.from(this.mesh.rotation, 0.5, {
            x: - Math.PI * 0.5,
            ease: "back.inOut(1.7)",
        })
        this.raycaster.objectsToTest.push(this.mesh)
        if(name){
            this.mesh.name = name
        }
        this.scene.add(this.mesh)
    }
}
import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'
let genHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export default class Diamonds {
    constructor(amount) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.diamondGroup = new THREE.Group()
        let geometry = new THREE.OctahedronGeometry(0.2)
        this.createDiamonds(geometry, amount)
        this.scene.add(this.diamondGroup)
        let diamondPositions = this.diamondGroup.children.map(i => i.position)
        gsap.to(diamondPositions, {
            x: Math.cos(100),
            y: Math.sin(100),
            z: Math.sin(100),
            duration: 25,
            yoyo: true,
            repeat: -1,
            stagger: 0.01,
            ease: "back.inOut(1.7)",
            repeatDelay: 8
        })
        let diamondRotations = this.diamondGroup.children.map(i => i.rotation)
        gsap.to(diamondRotations, {
            x: Math.PI * 8,
            duration: 20,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut()",
        })
    }

    createDiamonds(geometry, amount) {
        for(let i = 0; i < amount; i++){
            const d = new THREE.Mesh(
                geometry,
                new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#"+genHex(6))
                })
            )
            d.position.x = (Math.random() - 0.5) * 10
            d.position.y = (Math.random() - 0.5) * 10
            d.position.z = (Math.random() - 0.5) * 10
            d.rotation.x = Math.random() * Math.PI
            d.rotation.y = Math.random() * Math.PI
            const s = Math.random() * 1.25
            d.scale.set(s,s,s)
            this.diamondGroup.add(d);
        }
    }
}
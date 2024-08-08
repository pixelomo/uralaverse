import { Group, OctahedronGeometry, Mesh, MeshPhongMaterial, Color } from 'three';
import Experience from '../Experience.js'
import gsap from 'gsap'

let genHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export default class Diamonds {
    constructor(amount) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.isMobile = this.experience.world.isMobile()
        this.diamondGroup = new Group()
        let geometry = new OctahedronGeometry(0.2)
        this.createDiamonds(geometry, amount)
        this.scene.add(this.diamondGroup)
        let diamondPositions = this.diamondGroup.children.map(i => i.position)
        gsap.from(diamondPositions, {
            x: Math.cos(this.isMobile ? 5.2 : 11),
            y: Math.sin(this.isMobile ? 5.2 : 11),
            z: Math.sin(this.isMobile ? 5.2 : 11),
            duration: 12.5,
            yoyo: true,
            repeat: -1,
            stagger: 0.01,
            ease: "back.inOut(1.7)",
            repeatDelay: 8,
            // delay: 12
        })
        let diamondRotations = this.diamondGroup.children.map(i => i.rotation)
        gsap.from(diamondRotations, {
            x: Math.PI * 6,
            duration: 30,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut()",
        })
    }

    createDiamonds(geometry, amount) {
        for(let i = 0; i < amount; i++){
            const d = new Mesh(
                geometry,
                new MeshPhongMaterial({
                    color: new Color("#"+genHex(6))
                })
            )
            d.position.x = (Math.random() - 0.5) * 10
            d.position.y = (Math.random() - 0.5) * 10
            d.position.z = (Math.random() - 0.5) * 10
            d.rotation.x = Math.random() * Math.PI
            d.rotation.y = Math.random() * Math.PI
            const s = Math.random() * 1.5 // 1.25
            d.scale.set(s,s,s)
            this.diamondGroup.add(d);
        }
    }
}
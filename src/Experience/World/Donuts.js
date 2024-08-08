import { Group, TorusGeometry, Mesh, MeshNormalMaterial } from 'three';
import Experience from '../Experience.js';
import gsap from 'gsap';

let genHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export default class Donuts {
    constructor(amount) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.isMobile = this.experience.world.isMobile();
        this.donutGroup = new Group();
        let geometry = new TorusGeometry(0.3, 0.2, 20, 45);
        this.createDonuts(geometry, amount);
        this.scene.add(this.donutGroup);
        let donutPositions = this.donutGroup.children.map(i => i.position);
        gsap.from(donutPositions, {
            x: Math.cos(this.isMobile ? 5.2 : 11),
            y: Math.sin(this.isMobile ? 5.2 : 11),
            z: Math.sin(this.isMobile ? 5.2 : 11),
            duration: 12.5,
            yoyo: true,
            repeat: -1,
            stagger: 0.01,
            ease: "back.inOut(1.7)",
            repeatDelay: 8,
        });
        let donutScales = this.donutGroup.children.map(i => i.scale);
        gsap.from(donutScales, {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            duration: 12.5,
            yoyo: true,
            repeat: -1,
            stagger: 0.01,
            ease: "back.inOut(1.7)",
            repeatDelay: 8,
        });
        let donutRotations = this.donutGroup.children.map(i => i.rotation);
        gsap.to(donutRotations, {
            x: Math.PI * 4,
            duration: 20,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut()",
        });
    }

    createDonuts(geometry, amount) {
        for (let i = 0; i < amount; i++) {
            const d = new Mesh(
                geometry,
                new MeshNormalMaterial({
                    wireframe: true
                })
            );
            d.position.x = (Math.random() - 0.5) * 10;
            d.position.y = (Math.random() - 0.5) * 10;
            d.position.z = (Math.random() - 0.5) * 10;
            d.rotation.x = Math.random() * Math.PI;
            d.rotation.y = Math.random() * Math.PI;
            const s = Math.random() * 1.75;
            d.scale.set(s, s, s);
            this.donutGroup.add(d);
        }
    }
}

import { PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh } from 'three';
import Experience from '../Experience.js';
import gsap from 'gsap';
import vertexShader from './../shaders/vertex.glsl';
import fragmentShader from './../shaders/fragment.glsl';

export default class Plane {
    constructor(img, width, height, position, title, description, mobilePosition, isMobile) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.renderer = this.experience.renderer;
        this.raycaster = this.experience.raycaster;
        this.setGeometry(width, height);
        this.setMaterial(img);
        this.setMesh(position, title, description, mobilePosition, isMobile);
    }

    setGeometry(width, height) {
        this.geometry = new PlaneGeometry(width, height);
    }

    setMaterial(img) {
        const texture = this.resources.items[img];
        this.material = new MeshBasicMaterial({
            map: texture,
            side: DoubleSide
        });
        this.material.side = DoubleSide;
    }

    setMesh(position, title, description, mobilePosition, isMobile) {
        this.mesh = new Mesh(this.geometry, this.material);

        // Fallback for position with default values
        const safePosition = {
            x: position && position.x !== undefined ? position.x : 0,
            y: position && position.y !== undefined ? position.y : 0,
            z: position && position.z !== undefined ? position.z : 0,
        };

        // Fallback for mobilePosition with default values
        const safeMobilePosition = {
            x: mobilePosition && mobilePosition.x !== undefined ? mobilePosition.x : 0,
            y: mobilePosition && mobilePosition.y !== undefined ? mobilePosition.y : 0,
            z: mobilePosition && mobilePosition.z !== undefined ? mobilePosition.z : 0,
        };

        // Use safe positions based on isMobile
        if(isMobile) {
            this.mesh.position.set(safeMobilePosition.x, safeMobilePosition.y, safeMobilePosition.z);
        } else {
            this.mesh.position.set(safePosition.x, safePosition.y, safePosition.z);
        }

        this.mesh.name = 'portfolio';
        this.mesh.userData.title = title;
        this.mesh.userData.description = description;
        this.mesh.userData.position = position;
        this.mesh.userData.isMobile = isMobile;
        this.mesh.userData.mobilePosition = mobilePosition;
        this.raycaster.objectsToTest.push(this.mesh);
        this.scene.add(this.mesh);
    }

    update() {
        // Update logic, if any
    }
}

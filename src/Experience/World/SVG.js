import { Group, MeshBasicMaterial, Color, ShapeGeometry, Mesh, DoubleSide } from 'three';
import Experience from '../Experience.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

export default class SVG {
    constructor(name, url, position, scale) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.raycaster = this.experience.raycaster;
        this.resources = this.experience.resources;
        this.model = null;  // Initialize the model property
        this.addSVG(name, url, position, scale);
    }

    addSVG(name, url, position, scale) {
        const paths = this.resources.items[name].paths;
        const group = new Group();
        group.scale.multiplyScalar(0.25);
        group.position.x = -70;
        group.position.y = 70;
        group.scale.set(scale, scale, scale);
        group.scale.y *= -1;

        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const fillColor = path.userData.style.fill;

            if (fillColor !== undefined && fillColor !== 'none') {
                const material = new MeshBasicMaterial({
                    color: new Color().setStyle(fillColor).convertSRGBToLinear(),
                    opacity: path.userData.style.fillOpacity,
                    transparent: true,
                    side: DoubleSide,
                    depthWrite: false,
                });

                const shapes = SVGLoader.createShapes(path);

                for (let j = 0; j < shapes.length; j++) {
                    const shape = shapes[j];
                    const geometry = new ShapeGeometry(shape);
                    const mesh = new Mesh(geometry, material);
                    group.add(mesh);
                }
            }

            const strokeColor = path.userData.style.stroke;

            if (strokeColor !== undefined && strokeColor !== 'none') {
                const material = new MeshBasicMaterial({
                    color: new Color().setStyle(strokeColor).convertSRGBToLinear(),
                    opacity: path.userData.style.strokeOpacity,
                    transparent: true,
                    side: DoubleSide,
                    depthWrite: false,
                });

                for (let j = 0, jl = path.subPaths.length; j < jl; j++) {
                    const subPath = path.subPaths[j];
                    const geometry = SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);

                    if (geometry) {
                        const mesh = new Mesh(geometry, material);
                        group.add(mesh);
                    }
                }
            }
        }
        group.name = name;
        this.model = group;
        group.userData.url = url;
        this.raycaster.objectsToTest.push(group);
        group.position.set(position.x, position.y, position.z);
        group.lookAt(this.camera.instance.position);
        this.scene.add(group);

        // Debug
        this.debug = this.experience.debug;
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder(name + ' SVG');
            this.debugFolder.add(group.position, 'x').name('x').min(-125).max(125).step(0.1);
            this.debugFolder.add(group.position, 'y').name('y').min(-125).max(125).step(0.1);
            this.debugFolder.add(group.position, 'z').name('z').min(-125).max(125).step(0.1);
            this.debugFolder.add(group.rotation, 'x').name('x rotation').min(-125).max(125).step(0.1);
            this.debugFolder.add(group.rotation, 'y').name('y rotation').min(-125).max(125).step(0.1);
            this.debugFolder.add(group.rotation, 'z').name('z rotation').min(-125).max(125).step(0.1);
        }
    }
}

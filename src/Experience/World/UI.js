import * as THREE from 'three';
import Experience from '../Experience.js';
import ThreeMeshUI from 'three-mesh-ui';

export default class UI {
    constructor(text, size, color, position = { x: 0, y: 0, z: 0 }, name) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.container = {};
        this.createUI(text, size, color, position, name);
    }

    update() {
        ThreeMeshUI.update();
    }

    createUI(text = {title: "", description: ""}, size, color, position, name) {
        // Fallback for position with default values
        const safePosition = {
            x: position && position.x !== undefined ? position.x : 0,
            y: position && position.y !== undefined ? position.y : 0,
            z: position && position.z !== undefined ? position.z : 3, // Default z-value set to 3
        };

        this.container = new ThreeMeshUI.Block({
            ref: "container",
            padding: 0.025,
            fontFamily: '/fonts/roboto.json',
            fontTexture: '/fonts/roboto.webp',
            fontColor: new THREE.Color(0xffffff),
            backgroundOpacity: 0,
        });

        // Use safePosition for setting the position
        this.container.position.set(safePosition.x, safePosition.y, safePosition.z);
        this.container.rotation.x = 0.15;
        this.container.name = 'UI';
        this.container.scale.set(0,0,0);
        this.scene.add(this.container);

        this.title = new ThreeMeshUI.Block({
            height: 1.1,
            width: 7,
            margin: 0.025,
            justifyContent: "center",
            fontSize: 0.28,
            fontColor: new THREE.Color('#ffffff'),
            backgroundColor: new THREE.Color('#26002f'),
            backgroundOpacity: 0.4,
            bestFit: 'grow',
            borderRadius: .2,
        });

        this.title.add(new ThreeMeshUI.Text({ content: text.title }));
        this.container.add(this.title);

        const rightSubBlock = new ThreeMeshUI.Block({
            margin: 0.025,
            backgroundOpacity: 0,
        });

        this.description = new ThreeMeshUI.Block({
            height: 1.25,
            width: 7,
            margin: 0.025,
            padding: 0.1,
            fontSize: 0.17,
            textAlign: "left",
            fontColor: new THREE.Color('#ffffff'),
            backgroundColor: new THREE.Color('#26002f'),
            backgroundOpacity: 0.5,
            bestFit: 'grow',
            borderRadius: .2,
        })
        .add(new ThreeMeshUI.Text({
            content: text.description,
        }));

        rightSubBlock.add(this.description);

        const contentContainer = new ThreeMeshUI.Block({
            contentDirection: "row",
            padding: 0.02,
            margin: 0.025,
            backgroundOpacity: 0,
        });

        contentContainer.add(rightSubBlock);
        this.container.add(contentContainer);
    }
}

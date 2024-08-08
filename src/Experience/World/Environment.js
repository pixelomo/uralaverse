import { HemisphereLight, DirectionalLight, sRGBEncoding, Mesh, MeshStandardMaterial } from 'three';
import Experience from '../Experience.js';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('environment');
        }

        this.setSunLight();
        // this.setEnvironmentMap();
    }

    setSunLight() {
        // this.sunLight = new DirectionalLight('#ffffff', 4);
        // this.sunLight.castShadow = true;
        // this.sunLight.shadow.camera.far = 15;
        // this.sunLight.shadow.mapSize.set(1024, 1024);
        // this.sunLight.shadow.normalBias = 0.05;
        // this.sunLight.position.set(3.5, 2, - 1.25);
        // this.scene.add(this.sunLight);

        // Hemisphere light - low cost
        this.hemisphereLight = new HemisphereLight(0xff0000, 0x0000ff, 0.8);
        this.scene.add(this.hemisphereLight);

        // Point light - moderate cost
        this.pointLight = new DirectionalLight(0xffffff, 0.7);
        this.pointLight.position.set(1, 3, 10);
        // this.pointLight = new DirectionalLight(0xffffff, 5.2);
        // this.pointLight.position.set(-0.5, -4, 0.9);
        this.scene.add(this.pointLight);

        // Debug
        if(this.debug.active) {
            this.debugFolder
                .add(this.pointLight, 'intensity')
                .name('pointLightIntensity')
                .min(0)
                .max(10)
                .step(0.1);

            this.debugFolder
                .add(this.pointLight.position, 'x')
                .name('pLightX')
                .min(- 5)
                .max(5)
                .step(0.1);

            this.debugFolder
                .add(this.pointLight.position, 'y')
                .name('pLightY')
                .min(- 5)
                .max(5)
                .step(0.1);

            this.debugFolder
                .add(this.pointLight.position, 'z')
                .name('pLightZ')
                .min(- 5)
                .max(5)
                .step(0.1);

            this.debugFolder
                .add(this.hemisphereLight, 'intensity')
                .name('hemiLightIntensity')
                .min(0)
                .max(10)
                .step(0.1);

            this.debugFolder
                .add(this.hemisphereLight.position, 'x')
                .name('hLightX')
                .min(- 5)
                .max(5)
                .step(0.1);

            this.debugFolder
                .add(this.hemisphereLight.position, 'y')
                .name('hLightY')
                .min(- 5)
                .max(5)
                .step(0.1);

            this.debugFolder
                .add(this.hemisphereLight.position, 'z')
                .name('hLightZ')
                .min(- 5)
                .max(5)
                .step(0.1);
        }
    }

    setEnvironmentMap() {
        this.environmentMap = {};
        this.environmentMap.intensity = 0.4;
        this.environmentMap.texture = this.resources.items.environmentMapTexture;
        this.environmentMap.texture.encoding = sRGBEncoding;

        this.scene.environment = this.environmentMap.texture;

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture;
                    child.material.envMapIntensity = this.environmentMap.intensity;
                    child.material.needsUpdate = true;
                }
            });
        };
        this.environmentMap.updateMaterials();

        // Debug
        if(this.debug.active) {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials);
        }
    }
}

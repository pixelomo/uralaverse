import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
        // this.setEnvironmentMap()
    }

    setSunLight() {
        // this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        // this.sunLight.castShadow = true
        // this.sunLight.shadow.camera.far = 15
        // this.sunLight.shadow.mapSize.set(1024, 1024)
        // this.sunLight.shadow.normalBias = 0.05
        // this.sunLight.position.set(3.5, 2, - 1.25)
        // this.scene.add(this.sunLight)

        //  Hemisphere light - low cost
        this.hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, .8)
        this.scene.add(this.hemisphereLight)

        // Point light - moderate cost
        this.pointLight = new THREE.DirectionalLight(0xffffff, .7)
        this.pointLight.position.set(1, 3, 10)
        // this.pointLight = new THREE.DirectionalLight(0xffffff, 5.2)
        // this.pointLight.position.set(-0.5, -4, 0.9)
        this.scene.add(this.pointLight)

        // // Debug
        if(this.debug.active) {
            this.debugFolder
                .add(this.pointLight, 'intensity')
                .name('pointLightIntensity')
                .min(0)
                .max(10)
                .step(0.1)

            this.debugFolder
                .add(this.pointLight.position, 'x')
                .name('pLightX')
                .min(- 5)
                .max(5)
                .step(0.1)

            this.debugFolder
                .add(this.pointLight.position, 'y')
                .name('pLightY')
                .min(- 5)
                .max(5)
                .step(0.1)

            this.debugFolder
                .add(this.pointLight.position, 'z')
                .name('pLightZ')
                .min(- 5)
                .max(5)
                .step(0.1)

            this.debugFolder
                .add(this.hemisphereLight, 'intensity')
                .name('hemiLightIntensity')
                .min(0)
                .max(10)
                .step(0.1)

            this.debugFolder
                .add(this.hemisphereLight.position, 'x')
                .name('hLightX')
                .min(- 5)
                .max(5)
                .step(0.1)

            this.debugFolder
                .add(this.hemisphereLight.position, 'y')
                .name('hLightY')
                .min(- 5)
                .max(5)
                .step(0.1)

            this.debugFolder
                .add(this.hemisphereLight.position, 'z')
                .name('hLightZ')
                .min(- 5)
                .max(5)
                .step(0.1)
        }
    }

    /**
     * Lights
     */
    // Ambient light - low cost
    // const ambientLight = new THREE.AmbientLight()
    // ambientLight.color = new THREE.Color(0xff8867)
    // ambientLight.intensity = 0.01
    // scene.add(ambientLight)

    // Directional light - moderate cost
    // const directionalLight = new THREE.DirectionalLight(0xffffff, .7)
    // directionalLight.position.set(1, -.5, 1)
    // scene.add(directionalLight)

    // // Rect area light - high cost
    // const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
    // rectAreaLight.position.set(- 1.5, 0, 1.5)
    // rectAreaLight.lookAt(new THREE.Vector3())
    // scene.add(rectAreaLight)

    // Spot light - high cost
    // const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
    // spotLight.position.set(0, 2, 3)
    // scene.add(spotLight)

    // spotLight.target.position.x = - 0.75
    // scene.add(spotLight.target)

    setEnvironmentMap() {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        if(this.debug.active) {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }
}
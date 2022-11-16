import * as THREE from 'three'
import Experience from '../Experience.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export default class Text {
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

    fontMaker(text, font, size = 0.6, position, color, name, wireframe) {
        const textGeometry = new TextGeometry(
            text, {
                font: font,
                size: size,
                height: 0.3,
                // curveSegments: 1,
                // bevelEnabled: true,
                // bevelSize: 0.01,
                // bevelThickness: 0.03,
                // bevelOffset: 0,
                // bevelSegments: 1
            }
        )
        textGeometry.center()

        const textMesh = new THREE.Mesh()
        if(wireframe){
            textMesh.geometry = textGeometry
            textMesh.material = new THREE.MeshStandardMaterial({ color: color })
            let wireframe = new THREE.WireframeGeometry( textGeometry );
            let line = new THREE.LineSegments( wireframe );
            line.material.color.setHex(color);
            line.position.x = position.x
            line.position.y = position.y
            line.position.z = position.z
            scene.add(line);
            if(firstScene){
                gsap.to(line.scale, 10, {
                    z: 1.4,
                    yoyo: true,
                    repeat: -1,
                    repeatDelay: 5,
                    ease: "power1.inOut()",
                })
            }
        } else {
            textMesh.geometry = textGeometry
            textMesh.material = new THREE.MeshStandardMaterial({
                color: color
            })
            gsap.to(textMesh.rotation, 1, {
                x: - Math.PI * 2
            })
        }
        textMesh.position.x = position.x
        textMesh.position.y = position.y
        textMesh.position.z = position.z
        textMesh.name = name
        window[name + 'text'] = textMesh;
        objectsToTest.push(window[name + 'text'])
        scene.add(textMesh)
    }
}
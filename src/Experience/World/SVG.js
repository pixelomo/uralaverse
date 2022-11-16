import * as THREE from 'three'
import Experience from '../Experience.js'

export default class SVG {
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


    // loadSVG(path, name, url, position, scale) {

    //     const loader = new SVGLoader()

    //     loader.load( path, ( data ) => {
    //         const paths = data.paths
    //         const group = new THREE.Group()
    //         group.scale.multiplyScalar( 0.25 )
    //         group.position.x = - 70
    //         group.position.y = 70
    //         group.scale.set(scale, scale, scale)
    //         group.scale.y *= - 1

    //         for ( let i = 0; i < paths.length; i++ ) {
    //             const path = paths[ i ]
    //             const fillColor = path.userData.style.fill

    //             if ( fillColor !== undefined && fillColor !== 'none' ) {
    //                 const material = new THREE.MeshBasicMaterial( {
    //                     color: new THREE.Color().setStyle( fillColor ).convertSRGBToLinear(),
    //                     opacity: path.userData.style.fillOpacity,
    //                     transparent: true,
    //                     side: THREE.DoubleSide,
    //                     depthWrite: false,
    //                 });

    //                 const shapes = SVGLoader.createShapes( path )

    //                 for ( let j = 0; j < shapes.length; j ++ ) {
    //                     const shape = shapes[ j ]
    //                     const geometry = new THREE.ShapeGeometry( shape )
    //                     const mesh = new THREE.Mesh( geometry, material )
    //                     group.add(mesh)
    //                 }
    //             }

    //             const strokeColor = path.userData.style.stroke

    //             if ( strokeColor !== undefined && strokeColor !== 'none' ) {
    //                 const material = new THREE.MeshBasicMaterial( {
    //                     color: new THREE.Color().setStyle( strokeColor ).convertSRGBToLinear(),
    //                     opacity: path.userData.style.strokeOpacity,
    //                     transparent: true,
    //                     side: THREE.DoubleSide,
    //                     depthWrite: false,
    //                 });

    //                 for ( let j = 0, jl = path.subPaths.length; j < jl; j ++ ) {
    //                     const subPath = path.subPaths[ j ]
    //                     const geometry = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData.style )

    //                     if ( geometry ) {
    //                         const mesh = new THREE.Mesh( geometry, material )
    //                         group.add( mesh )
    //                     }
    //                 }
    //             }
    //         }
    //         group.name = name
    //         group.userData.url = url
    //         objectsToTest.push(group)
    //         group.position.set(position.x, position.y, position.z)
    //         group.lookAt(camera.position)
    //         scene.add(group)
    //     }
    // }

}


// tick

// uralaObject = scene.children.filter(obj => obj.name === 'urala')
//         ctObject = scene.children.filter(obj => obj.name === 'cointelegraph')
//         if(uralaObject.length > 0 && elapsedTime > 2){
//             uralaObject[0].lookAt(camera.position)
//             ctObject[0].lookAt(camera.position)
//         }
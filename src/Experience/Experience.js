import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'

import sources from './sources.js'
import params from './params.js'

let instance = null

export default class Experience {
    constructor(_canvas) {
        // Singleton
        if(instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.params = params

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) => {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh) {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material) {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}



    /**
     * Raycaster
     */
    //  const raycaster = new THREE.Raycaster()
    //  let currentIntersect = null
    //  const rayOrigin = new THREE.Vector3(- 3, 0, 0)
    //  const rayDirection = new THREE.Vector3(10, 0, 0)
    //  rayDirection.normalize()


    //  // /**
    //  //  * Mouse
    //  //  */
    //  // const mouse = new THREE.Vector2()

    //  // window.addEventListener('mousemove', (event) => {
    //  //     mouse.x = event.clientX / sizes.width * 2 - 1
    //  //     mouse.y = - (event.clientY / sizes.height) * 2 + 1
    //  // })

    //  let objectsToTest = []
    //  const intersects = raycaster.intersectObjects(objectsToTest)
    //  let clicked = false
    //  let enterColor

    //  window.addEventListener('click', () => {
    //      if(intersects.length) {
    //          if(!currentIntersect) {
    //              // console.log('click enter')
    //          }
    //          currentIntersect = intersects[0]
    //      } else {
    //          if(currentIntersect) {
    //              // console.log(currentIntersect)
    //              clicked = true
    //              enterColor = new THREE.Color('#490561')
    //              gsap.to(currentIntersect.object.material.color, 1, {
    //                  r: enterColor.r,
    //                  g: enterColor.g,
    //                  b: enterColor.b
    //              })

    //              ////////////////////// HOME //////////////////////////
    //              if(currentIntersect.object.name === 'home'){
    //                  gsap.to(camera.position, {
    //                      x: -2.5,
    //                      y: -3,
    //                      z: 6,
    //                      duration: 2,
    //                      ease: "back.inOut(1.7)",
    //                  })
    //                  uralaLogo = scene.children.filter(obj => obj.name === 'urala')
    //                  setTimeout(() => {
    //                      // while(scene.children.length > 0){
    //                      //     scene.remove(scene.children[0]);
    //                      // }
    //                      renderer.toneMappingExposure = 4
    //                      // aboutText.classList.remove('show')
    //                      // homeButton[0].visible = false
    //                      uralaLogo[0].position.y = 3
    //                      contactForm.classList.remove('show')
    //                      canvas.classList.remove('disable')
    //                      aboutSection.classList.remove('show')
    //                      controls.enabled = true;
    //                  }, 700)
    //              }

    //              /////////////////////////// CONTACT ///////////////////////////////
    //              if(currentIntersect.object.name === 'contact'){
    //                  gsap.to(camera.position, {
    //                      x: -0.82,
    //                      y: -0.33,
    //                      z: -1.8,
    //                      duration: 2,
    //                      ease: "back.inOut(1.7)",
    //                  })
    //                  aboutSection.classList.remove('show')
    //                  locationSection.classList.remove('show')
    //                  uralaLogo = scene.children.filter(obj => obj.name === 'urala')
    //                  setTimeout(() => {
    //                      renderer.toneMappingExposure = 2.2
    //                      // renderer.toneMappingExposure = 1
    //                      // contact plane
    //                      // const plane = new THREE.Mesh(
    //                      //     new THREE.PlaneGeometry(6, 4),
    //                      //     new THREE.MeshBasicMaterial({
    //                      //         color: '#000',
    //                      //         transparent: true
    //                      //     })
    //                      // )
    //                      // plane.rotation.x = Math.PI / 1.2
    //                      // plane.position.z = 2
    //                      // plane.position.x = 1.5
    //                      // plane.position.y = 1
    //                      // objectsToTest.push(plane)
    //                      // scene.add(plane)
    //                      uralaLogo[0].position.y = 6
    //                      contactForm.classList.add('show')
    //                      canvas.classList.add('disable')
    //                      document.getElementById("name").focus();
    //                      // homeButton[0].position.set(1, -1.5, 2)
    //                      // homeButton[0].visible = true
    //                      // homeButton[0].lookAt(camera.position)
    //                      // pointLight.lookAt(homeButton[0].position)
    //                  }, 1200)
    //              }

    //              /////////////////////////// ABOUT ///////////////////////////////
    //              if(currentIntersect.object.name === 'about'){
    //                  gsap.to(camera.position, {
    //                      x: 5,
    //                      y: 14,
    //                      z: 5,
    //                      duration: 2,
    //                      ease: "back.inOut(1.7)",
    //                  })
    //                  locationSection.classList.remove('show')
    //                  setTimeout(() => {
    //                      aboutSection.classList.add('show')
    //                      // homeButton[0].visible = true
    //                      // homeButton[0].position.set(-4,3,2)
    //                      // homeButton[0].lookAt(camera.position)
    //                      // homeButton[0].rotation.y = 500
    //                  }, 1200)
    //              }
    //              if(typeof currentIntersect !== null && currentIntersect.object.parent.userData.url){
    //                  window.open(currentIntersect.object.parent.userData.url, '_blank').focus();
    //              }
    //              /////////////////////////// LOCATIONS ///////////////////////////////
    //              if(currentIntersect.object.name === 'locations'){
    //                  canvas.classList.add('fade')
    //                  gsap.globalTimeline.clear()
    //                  setTimeout(() => {
    //                      while(scene.children.length > 0){
    //                          scene.remove(scene.children[0]);
    //                      }
    //                      initLocations()
    //                      locationScene = true
    //                  }, 1000)
    //                  setTimeout(() => {
    //                      canvas.classList.remove('fade')
    //                      locationSection.classList.add('show')
    //                  }, 3000)
    //                  // gsap.to(camera.position, {
    //                  //     x: -3.4,
    //                  //     y: 16.25,
    //                  //     z: -0.6,
    //                  //     duration: 2,
    //                  //     ease: "back.inOut(1.7)",
    //                  // })
    //                  // scene.traverse((child) =>{
    //                  //     if(child.name === 'globe'){
    //                  //         // console.log(child.parent)
    //                  //         let g = child.parent.position
    //                  //         // cameraGroup.position.set(g.x, g.y, g.z)
    //                  //         // pointLight.lookAt(g)
    //                  //         pointLight.position.set(camera.position.x, camera.position.y, camera.position.z)
    //                  //         // controls.object.position.set(g.x,g.y,g.z)
    //                  //         gsap.to(child.parent.rotation, {
    //                  //             y: Math.PI * 4,
    //                  //             duration: 40,
    //                  //             repeat: -1,
    //                  //             ease: "linear",
    //                  //         })
    //                  //         gsap.to(camera.position, {
    //                  //             x: g.x - 0.4,
    //                  //             y: g.y - 0.9,
    //                  //             z: g.z + 1.75,
    //                  //             duration: 2,
    //                  //             ease: "back.inOut(1.7)",
    //                  //         })
    //                  //         console.log(camera.position)
    //                  //         // gsap.to(camera.position, {
    //                  //         //     x: -2.5,
    //                  //         //     y: -9.18,
    //                  //         //     z: 2.26,
    //                  //         //     duration: 2,
    //                  //         //     ease: "back.inOut(1.7)",
    //                  //         // })
    //                  //         // gsap.to(camera.rotation, {
    //                  //         //     x: -6.55,
    //                  //         //     y: -0.356,
    //                  //         //     z: 0.17,
    //                  //         //     duration: 2,
    //                  //         //     ease: "back.inOut(1.7)",
    //                  //         // })
    //                  //         sceneReady = true
    //                  //         controls.enabled = false
    //                  //         // camera.lookAt(g)
    //                  //     }
    //                  // })
    //                  aboutSection.classList.remove('show')
    //                  // setTimeout(() => {
    //                  //     locationSection.classList.add('show')
    //                  // }, 1200)
    //              }
    //              // if(currentIntersect.object.name === 'about'){
    //              //     setTimeout(() => {
    //              //         while(scene.children.length > 0){
    //              //             scene.remove(scene.children[0]);
    //              //         }
    //              //         renderer.toneMappingExposure = 4
    //              //         scene.add(camera)
    //              //         aboutScene()
    //              //     }, 1200)
    //              // }

    //          }
    //      }
    //  })

    //  const goHome = () => {
    //      if(locationScene) {
    //          while(scene.children.length > 0){
    //              scene.remove(scene.children[0]);
    //          }
    //          initHome()
    //          locationSection.classList.remove('show')
    //          renderer.toneMappingExposure = 4
    //      } else {
    //          gsap.to(camera.position, {
    //              x: -2.5,
    //              y: -3,
    //              z: 6,
    //              duration: 2,
    //              ease: "back.inOut(1.7)",
    //          })
    //          uralaLogo = scene.children.filter(obj => obj.name === 'urala')
    //          setTimeout(() => {
    //              renderer.toneMappingExposure = 4
    //              uralaLogo[0].position.y = 3
    //              contactForm.classList.remove('show')
    //              canvas.classList.remove('disable')
    //              aboutSection.classList.remove('show')
    //              locationSection.classList.remove('show')
    //          }, 700)
    //      }
    //  }

    //  const close = document.querySelectorAll('.close-button')

    //  close.forEach(btn => btn.addEventListener('click', () => {
    //      goHome()
    //  }))
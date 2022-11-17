import * as THREE from 'three'
import Experience from './Experience.js'
import gsap from 'gsap'

export default class Raycaster {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.objectsToTest = []
        this.setInstance()
        this.currentIntersect = null
        this.contactForm = document.querySelector('.contactForm')
        this.aboutSection = document.querySelector('#about')
        this.locationSection = document.querySelector('#locations')
        const close = document.querySelectorAll('.close-button')
        close.forEach(btn => btn.addEventListener('click', () => {
            this.goHome()
        }))
        this.color = null
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })

        window.addEventListener('click', () => {
            if(this.intersects.length) {
                if(!this.currentIntersect) {
                    // console.log('click enter')
                }
                this.currentIntersect = intersects[0]
            } else {
                if(this.currentIntersect) {
                    // console.log(currentIntersect)
                    this.color = new THREE.Color('#490561')
                    gsap.to(this.currentIntersect.object.material.color, 1, {
                        r: this.color.r,
                        g: this.color.g,
                        b: this.color.b
                    })

                    ////////////////////// HOME //////////////////////////
                    if(this.currentIntersect.object.name === 'home'){
                        gsap.to(this.camera.position, {
                            x: -2.5,
                            y: -3,
                            z: 6,
                            duration: 2,
                            ease: "back.inOut(1.7)",
                        })
                        // uralaLogo = scene.children.filter(obj => obj.name === 'urala')
                        setTimeout(() => {
                            // while(scene.children.length > 0){
                            //     scene.remove(scene.children[0]);
                            // }
                            // renderer.toneMappingExposure = 4
                            // homeButton[0].visible = false
                            // uralaLogo[0].position.y = 3
                            this.contactForm.classList.remove('show')
                            // canvas.classList.remove('disable')
                            this.aboutSection.classList.remove('show')
                            // controls.enabled = true;
                        }, 700)
                    }

                    /////////////////////////// CONTACT ///////////////////////////////
                    if(this.currentIntersect.object.name === 'contact'){
                        gsap.to(this.camera.position, {
                            x: -0.82,
                            y: -0.33,
                            z: -1.8,
                            duration: 2,
                            ease: "back.inOut(1.7)",
                        })
                        this.aboutSection.classList.remove('show')
                        this.locationSection.classList.remove('show')
                        // uralaLogo = scene.children.filter(obj => obj.name === 'urala')
                        setTimeout(() => {
                            // renderer.toneMappingExposure = 2.2
                            // renderer.toneMappingExposure = 1
                            // contact plane
                            // const plane = new THREE.Mesh(
                            //     new THREE.PlaneGeometry(6, 4),
                            //     new THREE.MeshBasicMaterial({
                            //         color: '#000',
                            //         transparent: true
                            //     })
                            // )
                            // plane.rotation.x = Math.PI / 1.2
                            // plane.position.z = 2
                            // plane.position.x = 1.5
                            // plane.position.y = 1
                            // objectsToTest.push(plane)
                            // scene.add(plane)
                            // uralaLogo[0].position.y = 6
                            this.contactForm.classList.add('show')
                            // canvas.classList.add('disable')
                            document.getElementById("name").focus();
                            // homeButton[0].position.set(1, -1.5, 2)
                            // homeButton[0].visible = true
                            // homeButton[0].lookAt(camera.position)
                            // pointLight.lookAt(homeButton[0].position)
                        }, 1200)
                    }

                    /////////////////////////// ABOUT ///////////////////////////////
                    if(this.currentIntersect.object.name === 'about'){
                        gsap.to(this.camera.position, {
                            x: 5,
                            y: 14,
                            z: 5,
                            duration: 2,
                            ease: "back.inOut(1.7)",
                        })
                        this.locationSection.classList.remove('show')
                        setTimeout(() => {
                            this.aboutSection.classList.add('show')
                            // homeButton[0].visible = true
                            // homeButton[0].position.set(-4,3,2)
                            // homeButton[0].lookAt(camera.position)
                            // homeButton[0].rotation.y = 500
                        }, 1200)
                    }

                    /////////////////////////// SVG LINK ///////////////////////////
                    if(typeof this.currentIntersect !== null && this.currentIntersect.object.parent.userData.url){
                        window.open(this.currentIntersect.object.parent.userData.url, '_blank').focus();
                    }

                    /////////////////////////// LOCATIONS ///////////////////////////////
                    if(this.currentIntersect.object.name === 'locations'){
                        this.experience.canvas.classList.add('fade')
                        gsap.globalTimeline.clear()
                        this.aboutSection.classList.remove('show')
                        setTimeout(() => {
                            while(this.experience.scene.children.length > 0){
                                this.experience.scene.remove(this.experience.scene.children[0]);
                            }
                            this.experience.world.showLocations()
                            this.camera.controls.minDistance = 4.5;
                            this.camera.controls.maxDistance = 5.7;
                            // this.experience.scene.children.destroy()
                            // initLocations()
                            // locationScene = true
                        }, 1000)
                        setTimeout(() => {
                            // canvas.classList.remove('fade')
                            this.locationSection.classList.add('show')
                        }, 3000)
                    }
                }
            }
        })
    }

    setInstance() {
    //  const rayOrigin = new THREE.Vector3(- 3, 0, 0)
    //  const rayDirection = new THREE.Vector3(10, 0, 0)
    //  rayDirection.normalize()
        this.raycaster = new THREE.Raycaster()
        this.raycaster.far = 100
        this.intersects = this.raycaster.intersectObjects(this.objectsToTest)
    }

    update() {
        this.raycaster.setFromCamera(this.mouse, this.camera)
        // console.log(this.intersects)
        const intersects = this.raycaster.intersectObjects(this.objectsToTest)
        if(intersects.length) { // mouse enter
            this.currentIntersect = intersects[0]
            this.color = new THREE.Color('#00c4eb')
            gsap.to(this.currentIntersect.object.material.color, 4, {
                r: this.color.r,
                g: this.color.g,
                b: this.color.b
            })
        } else { // mouse leave
            if(this.currentIntersect) {
                this.color = new THREE.Color('#00c4eb')
            }
            this.currentIntersect = null
        }
    }

    goHome() {
        // if(locationScene) {
        //     while(scene.children.length > 0){
        //         scene.remove(scene.children[0]);
        //     }
        //     initHome()
        //     locationSection.classList.remove('show')
        //     renderer.toneMappingExposure = 4
        // } else {
            gsap.to(this.camera.position, {
                x: -2.5,
                y: -3,
                z: 6,
                duration: 2,
                ease: "back.inOut(1.7)",
            })
            // uralaLogo = scene.children.filter(obj => obj.name === 'urala')
            setTimeout(() => {
                // renderer.toneMappingExposure = 4
                // uralaLogo[0].position.y = 3
                this.contactForm.classList.remove('show')
                // canvas.classList.remove('disable')
                this.aboutSection.classList.remove('show')
                this.locationSection.classList.remove('show')
            }, 700)
        // }
    }
}
import * as THREE from 'three'
import Experience from './Experience.js'
import gsap from 'gsap'
import UI from './World/UI.js'

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
        this.testHomeObjects = true
        this.testPortfolioObjects = false
        this.testLocationsObjects = false
        this.locationsNames = ['Tokyo', 'London', 'Jakarta', 'Ho Chi Minh', 'Kuala Lumpur', 'Fukui', 'Singapore', 'Seoul', 'Manila', 'Melbourne']

        const close = document.querySelectorAll('.close-button')
        close.forEach(btn => btn.addEventListener('click', () => {
            this.goHome()
        }))

        const closeControlsButton = document.querySelector('.close-controls-button')
        const controlsInstructions = document.querySelector('.controls')
        closeControlsButton.addEventListener('click', () => {
            controlsInstructions.classList.add('hide')
        })

        this.closeLocationsModal = document.querySelector('.close-locations-button')
        this.locationsModal = document.querySelector('#locations')
        this.locationsHiddenButton = document.querySelector('#locations-hidden-button')

        this.closeLocationsModal.addEventListener('click', () => {
            this.locationsModal.classList.add('hide')
            this.locationsHiddenButton.classList.remove('hide')
        })

        this.workModal = document.querySelector('#work')

        this.color = null
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })

        window.addEventListener('click', () => {
            if(this.testHomeObjects === true){
                if(this.intersects.length) {
                    if(!this.currentIntersect) {
                        // console.log('click enter')
                    }
                    this.currentIntersect = intersects[0]
                } else {
                    if(this.currentIntersect) {
                        // console.log(this.currentIntersect.object.name)
                        if(this.currentIntersect.object.name != 'portfolio') {
                            this.color = new THREE.Color('#00ff0d')
                            gsap.to(this.currentIntersect.object.material.color, 1, {
                                r: this.color.r,
                                g: this.color.g,
                                b: this.color.b
                            })
                        }

                        ////////////////////// HOME //////////////////////////
                        // if(this.currentIntersect.object.name === 'home'){
                        //     gsap.to(this.camera.position, {
                        //         x: -2.5,
                        //         y: -3,
                        //         z: 6,
                        //         duration: 2,
                        //         ease: "back.inOut(1.7)",
                        //     })
                        //     this.experience.world.showHome()
                        //     setTimeout(() => {
                        //         this.contactForm.classList.remove('show')
                        //         this.aboutSection.classList.remove('show')
                        //     }, 700)
                        // }

                        /////////////////////////// CONTACT ///////////////////////////////
                        /////////////////////////// CONTACT ///////////////////////////////
                        if(this.currentIntersect.object.name === 'contact'){
                            gsap.to(this.camera.position, {
                                x: -0.82,
                                y: -0.33,
                                z: -1.8,
                                duration: 2,
                                ease: "back.inOut(1.7)",
                            })
                            this.testHomeObjects = false
                            this.aboutSection.classList.remove('show')
                            this.locationSection.classList.remove('show')
                            setTimeout(() => {
                                this.contactForm.classList.add('show')
                                document.getElementById("name").focus();
                            }, 1200)
                        }

                        /////////////////////////// ABOUT ///////////////////////////////
                        /////////////////////////// ABOUT ///////////////////////////////
                        if(this.currentIntersect.object.name === 'about'){
                            // gsap.to(this.camera.position, {
                            //     x: 5,
                            //     y: 14,
                            //     z: 5,
                            //     duration: 2,
                            //     ease: "back.inOut(1.7)",
                            // })
                            this.testHomeObjects = false
                            this.experience.camera.disableControls()
                            this.locationSection.classList.remove('show')
                            gsap.to(this.camera.position, {
                                x: -2.2,
                                y: -3,
                                z: 8.9,
                                duration: 2,
                                ease: "back.inOut(1.7)",
                            })
                            gsap.to(this.camera.rotation, {
                                x: 1.2,
                                y: 0.1,
                                z: -0.1,
                                duration: 2,
                                ease: "back.inOut(1.7)",
                            })
                            setTimeout(() => {
                                this.aboutSection.classList.add('show')
                            }, 1200)
                        }

                        /////////////////////////// SVG LINK ///////////////////////////
                        /////////////////////////// SVG LINK ///////////////////////////
                        if(typeof this.currentIntersect !== null && this.currentIntersect.object.parent.userData.url){
                            window.open(this.currentIntersect.object.parent.userData.url, '_blank').focus();
                        }

                        /////////////////////////// LOCATIONS ///////////////////////////////
                        /////////////////////////// LOCATIONS ///////////////////////////////
                        if(this.currentIntersect.object.name === 'locations'){
                            gsap.to(this.camera.position, {
                                x: -25,
                                y: 25,
                                z: -10,
                                duration: 2,
                                ease: "back.inOut(1.1)",
                            })
                            this.testHomeObjects = false
                            this.testLocationsObjects = true
                            setTimeout(() => {
                                this.experience.world.showLocations()
                            }, 800)
                            this.aboutSection.classList.remove('show')
                            setTimeout(() => {
                                // while(this.experience.scene.children.length > 0){
                                //     this.experience.scene.remove(this.experience.scene.children[0]);
                                // }
                                // this.camera.controls.minDistance = 4.5;
                                // this.camera.controls.maxDistance = 5.7;
                                // this.experience.scene.children.destroy()
                                // locationScene = true
                                gsap.to(this.camera.position, {
                                    x: 3.8,
                                    y: 2,
                                    z: 8,
                                    duration: 2,
                                    ease: "back.inOut(1.2)",
                                })
                            }, 1500)
                            setTimeout(() => {
                                // this.locationSection.classList.add('show')
                                this.locationsHiddenButton.classList.remove('hide')
                            }, 4000)
                            // setTimeout(() => {
                            //     // canvas.classList.remove('fade')
                            //     this.locationSection.classList.add('show')
                            // }, 3000)
                        }

                        /////////////////////////// WORK ///////////////////////////////
                        /////////////////////////// WORK ///////////////////////////////
                        if(this.currentIntersect.object.name === 'work'){
                            gsap.to(this.camera.position, {
                                x: 2,
                                y: -3,
                                z: 8,
                                duration: 1.5,
                                ease: "back.inOut(1.7)",
                            })
                            this.testHomeObjects = false
                            this.testPortfolioObjects = true
                            // this.workModal.classList.add('show')
                            this.locationsHiddenButton.classList.remove('hide')
                            this.experience.world.showWork()
                        }
                        /////////////////////////// WORK  END ///////////////////////////////
                        /////////////////////////// WORK END ///////////////////////////////
                    }
                }
            } // end of textHomeObjects
            ///////////////////////////// PORTFOLIO ///////////////////////////////////
            ///////////////////////////// PORTFOLIO ///////////////////////////////////
            if(this.testPortfolioObjects === true){
                if(this.intersects.length) {
                    this.currentIntersect = intersects[0]
                } else {
                    if(this.currentIntersect) {
                        if(this.currentIntersect.object.name === 'portfolio'){
                            // console.log(this.currentIntersect.object.userData)
                            let portfolioItem = this.currentIntersect.object
                            gsap.to(this.camera.position, {
                                x: 0,
                                y: 3,
                                z: 8,
                                duration: 1.2
                            })
                            // userData back to original position
                            gsap.to(portfolioItem.position, {
                                x: 0,
                                y: 0,
                                z: 2,
                                duration: 1.2,
                            })
                            // if no UI create
                            if(typeof this.ui === 'undefined'){
                                this.ui = new UI({title: portfolioItem.userData.title, description: portfolioItem.userData.description})
                            } else {
                                this.ui.title.children[1].set({content: portfolioItem.userData.title})
                                this.ui.description.children[1].set({content: portfolioItem.userData.description})
                            }
                            // if UI scale = 1 => 0
                            // console.log(portfolioItem.scale.x)
                            if(this.ui.container.scale.x === 0){
                                this.ui.container.scale.set(1,1,1)
                                this.ui.container.rotation.set(0.15,0,0)
                                this.ui.container.position.set(0, 0, 3)
                                gsap.to(portfolioItem.scale, {
                                    x: 3,
                                    y: 3,
                                    z: 3,
                                    duration: 1.2,
                                })
                                gsap.to(portfolioItem.position, {
                                    x: 0,
                                    y: 0,
                                    z: 2,
                                    duration: 1.2,
                                })
                            } else {
                                this.ui.container.scale.set(0,0,0)
                                gsap.to(portfolioItem.scale, {
                                    x: 1,
                                    y: 1,
                                    z: 1,
                                    duration: 1.2,
                                })
                                gsap.to(portfolioItem.position, {
                                    x: portfolioItem.userData.position.x,
                                    y: portfolioItem.userData.position.y,
                                    z: portfolioItem.userData.position.z,
                                    duration: 1.2,
                                })
                            }
                        }
                    }
                }
            } // end of portfolio
            ///////////////////////////// GLOBE ///////////////////////////////////
            ///////////////////////////// GLOBE ///////////////////////////////////
            if(this.testLocationsObjects === true){
                if(this.intersects.length) {
                    this.currentIntersect = intersects[0]
                } else {
                    if(this.currentIntersect) {
                        // console.log(this.currentIntersect.object.name)
                        //for loop locations, if current includes locations[i].name
                        // this.locationsNames
                        for(let i = 0; i < this.locationsNames.length; i++){
                            if(this.currentIntersect.object.name.includes(this.locationsNames[i]) && typeof this.currentIntersect.object.userData.address != 'undefined'){
                                // console.log(this.currentIntersect.object.userData)
                                // if no UI create
                                if(typeof this.ui === 'undefined'){
                                    this.ui = new UI({title: this.locationsNames[i], description: this.currentIntersect.object.userData.address})
                                } else {
                                    this.ui.title.children[1].set({content: this.locationsNames[i]})
                                    this.ui.description.children[1].set({content: this.currentIntersect.object.userData.address})
                                }
                                // if UI scale = 1 => 0
                                if(this.ui.container.scale.x === 0){
                                    this.ui.container.scale.set(0.45,0.45,0.45)
                                    // this.ui.container.position.set(-1,2.7,4.5)
                                    this.ui.container.position.set(2.2,1,4.6)
                                }
                                this.ui.container.lookAt(this.camera.position)
                                // else {
                                //     this.ui.container.scale.set(0,0,0)
                                // }
                            } else {
                                if(typeof this.currentIntersect.object.userData.address === 'undefined'){
                                    if(this.ui){
                                        this.ui.container.scale.set(0,0,0)
                                    }
                                }
                            }
                        }
                        // if(this.currentIntersect.object.name.includes('Tokyo')){
                            // console.log(this.currentIntersect.object.userData.address)
                            // console.log(this.currentIntersect.object.userData)
                            // let portfolioItem = this.currentIntersect.object
                            // gsap.to(this.camera.position, {
                            //     x: 0,
                            //     y: 3,
                            //     z: 8,
                            //     duration: 1.2
                            // })
                            // // userData back to original position
                            // gsap.to(portfolioItem.position, {
                            //     x: 0,
                            //     y: 0,
                            //     z: 2,
                            //     duration: 1.2,
                            // })
                        // }
                    }
                }
            } // end of globe
            // console.log(this.objectsToTest)
        })

        // Accordion on locations modal mobile view
        let acc = document.getElementsByClassName("location")
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active")
                let panel = this.nextElementSibling
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px"
                }
            })
        }
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
        const intersects = this.raycaster.intersectObjects(this.objectsToTest)
        if(intersects.length) { // mouse enter
            this.currentIntersect = intersects[0]
            // console.log(this.currentIntersect.object.material.color)
            if(this.currentIntersect.object.name === 'about' || this.currentIntersect.object.name === 'contact' || this.currentIntersect.object.name === 'locations' || this.currentIntersect.object.name === 'work'){
                this.color = new THREE.Color('#00c4eb')
                gsap.to(this.currentIntersect.object.material.color, 0.5, {
                    r: this.color.r,
                    g: this.color.g,
                    b: this.color.b
                })
                // gsap.to(this.currentIntersect.object.scale, 0.5, {
                //     x: 1.1,
                //     y: 1.1,
                //     z: 1.1
                // })
            }
        } else { // mouse leave
            this.currentIntersect = null
            if(this.experience.world.work){
                this.resetTextColor(this.experience.world.about.mesh)
                this.resetTextColor(this.experience.world.locations.mesh)
                this.resetTextColor(this.experience.world.contact.mesh)
                this.resetTextColor(this.experience.world.work.mesh)
            }
        }
    }

    resetTextColor(mesh) {
        if(mesh.material.color != mesh.material.userData.color){
            gsap.to(mesh.material.color, 0.5, {
                r: mesh.material.userData.color.r,
                g: mesh.material.userData.color.g,
                b: mesh.material.userData.color.b
            })
        }
    }

    goHome() {
        this.experience.camera.enableControls()
        this.testHomeObjects = true
        this.testPortfolioObjects = false
        this.testLocationsObjects = false
        gsap.to(this.camera.position, {
            x: -2.5,
            y: -3,
            z: 6,
            duration: 2,
            ease: "back.inOut(1.7)",
        })
        this.experience.world.showHome()
        this.aboutSection.classList.remove('show')
        this.locationsHiddenButton.classList.add('hide')
        this.locationsModal.classList.remove('hide')
        this.locationSection.classList.remove('show')
        if(typeof this.ui != 'undefined'){
            // reset portfolio
            this.ui.container.scale.set(0,0,0)
            this.experience.world.resetWork()
        }
        // this.workModal.classList.remove('show')
        setTimeout(() => {
            this.contactForm.classList.remove('show')
        }, 700)
    }
}
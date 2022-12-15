import * as THREE from 'three'
import Experience from '../Experience.js'
import ThreeMeshUI from 'three-mesh-ui'

export default class UI {
    constructor(text, size, color, position, name) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
		this.container = {}
        this.createUI(text, size)
    }

    // createUI(text, size) {
	// 	const container = new ThreeMeshUI.Block({
	// 		width: 8,
	// 		height: 2.5,
	// 		fontColor: new THREE.Color('#00f2be'),
	// 		backgroundColor: new THREE.Color('#680080'),
	// 		backgroundOpacity: 0.4,
	// 		fontSize: .25,
	// 		bestFit: 'grow',
	// 		borderRadius: .2,
	// 		padding: 0.2,
	// 		fontFamily: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.json',
	// 		fontTexture: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.png'
	// 	});
	// 	const ui = new ThreeMeshUI.Text({
	// 		content: "We are URALA! \n a new-era, cross-border creative marketing and communications/PR agency. We help brands scale globally and across new markets."
	// 	});
	// 	container.position.set(1, 5.5, -3)
	// 	container.add(ui);
	// 	this.scene.add( container );
    // }

	update() {
		ThreeMeshUI.update();
	}

	createUI(text = {title: "", description: ""}) {
		this.container = new ThreeMeshUI.Block({
			ref: "container",
			padding: 0.025,
			fontFamily: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.json',
		 	fontTexture: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.png',
		// fontFamily: this.resources.items.uiFont.data,
		// fontTexture: this.resources.items.uiTexture.source.data.currentSrc,
			fontColor: new THREE.Color(0xffffff),
			backgroundOpacity: 0,
		});

		this.container.position.set(0, 0, 3)
		this.container.rotation.x = 0.15;
		this.container.scale.set(0,0,0)
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

		// const leftSubBlock = new ThreeMeshUI.Block({
		// 	height: 2.5,
		// 	width: 3.9,
		// 	margin: 0.025,
		// 	padding: 0.025,
		// 	textAlign: "left",
		// 	justifyContent: "end",
		// 	borderRadius: .2,
		// });

		// const caption = new ThreeMeshUI.Block({
		//   height: 0.07,
		//   width: 0.37,
		//   textAlign: "center",
		//   justifyContent: "center",
		// });

		// caption.add(
		//   new ThreeMeshUI.Text({
		// 	content: "Mind your fingers",
		// 	fontSize: 0.04,
		//   })
		// );

		// leftSubBlock.add(caption);

		const rightSubBlock = new ThreeMeshUI.Block({
		  margin: 0.025,
		  backgroundOpacity: 0,
		});

		this.description = new ThreeMeshUI.Block({
			height: 1.15,
			width: 7,
			margin: 0.025,
			padding: 0.1,
			fontSize: 0.17,
			textAlign: "left",
			// justifyContent: "center",
			fontColor: new THREE.Color('#ffffff'),
			backgroundColor: new THREE.Color('#26002f'),
			backgroundOpacity: 0.5,
			bestFit: 'grow',
			borderRadius: .2,
		})
		.add(new ThreeMeshUI.Text({
			content: text.description,
		}))

		rightSubBlock.add(this.description)

		const contentContainer = new ThreeMeshUI.Block({
		  contentDirection: "row",
		  padding: 0.02,
		  margin: 0.025,
		  backgroundOpacity: 0,
		});

		contentContainer.add(rightSubBlock);
		this.container.add(contentContainer);

		// new THREE.TextureLoader().load(this.resources.items.neonTexture.source.data.currentSrc, (texture) => {
		//   leftSubBlock.set({
		// 	backgroundTexture: texture,
		//   });
		// });
	}
}
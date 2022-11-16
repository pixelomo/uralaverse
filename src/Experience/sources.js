export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.jpg'
    },
    {
        name: 'globe',
        type: 'gltfModel',
        path: 'models/earthText.glb'
    },
    {
        name: 'galaxy',
        type: 'font',
        path: 'fonts/galaxy.json'
    },
    {
        name: 'urala',
        type: 'svg',
        url: 'https://www.sortlist.com/agency/urala-communications',
        position: {x: 3, y: 3, z: 0},
        scale: 0.015,
        path: 'images/urala-b.svg'
    },
    {
        name: 'cointelegraph',
        type: 'svg',
        url: 'https://jp.cointelegraph.com/',
        position: {x: -5.5, y: 4, z: -.5},
        scale: 0.015,
        path: 'images/ctb.svg'
    }
]


// const matcapTexture2 = textureLoader.load('/textures/matcaps/4.png')
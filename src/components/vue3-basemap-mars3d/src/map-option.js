import gaodeImg from './images/gaode-img.png';
import gaodeVec from './images/gaode-vec.png';

export default {
  scene: {
    center: {"lat":22.526982,"lng":113.947837,"alt":1542,"heading":1,"pitch":-67},
    showSun: false,
    showMoon: false,
    showSkyBox: true,
    shadows: false,
    highDynamicRange: true,
    showSkyAtmosphere: true, // 关闭球周边的白色轮廓 map.scene.skyAtmosphere = false
    fog: false,
    fxaa: true,
    backgroundColor: '#fff',
    globe: {
      showGroundAtmosphere: false, // 关闭大气（球表面白蒙蒙的效果）
      depthTestAgainstTerrain: false,
      baseColor: '#546a53'
    },
    cameraController: {
      zoomFactor: 3.0,
      minimumZoomDistance: 1,
      maximumZoomDistance: 50000000,
      enableRotate: true,
      enableZoom: true
    }
  },
  control: {
    baseLayerPicker: true,
    terrainProviderViewModels: [],
    compass: {
      right: '0',
      bottom: '160px'
    },
    zoom: {
      insertIndex: 1
    },
    distanceLegend: {
      right: '45px',
      bottom: '10px'
    },
    homeButton: false,
    fullscreenButton: true
  },
  basemaps: [
    {
      name: '高德电子',
      icon: gaodeVec,
      type: 'gaode',
      layer: 'vec',
      show: true
    },
    {
      name: '高德影像',
      icon: gaodeImg,
      type: 'group',
      layers: [
        { name: '底图', type: 'gaode', layer: 'img_d' },
        { name: '注记', type: 'gaode', layer: 'img_z' }
      ]
    }
  ]
};

// import 'aframe'
import './scss/style.scss'
declare var AFRAME: any;
declare var THREE: any;

function main(): void {
  AFRAME.registerComponent('time-counter', {
    schema: {},
    init: function () {
      this.data.count = 0
    },
    tick: function () {
      this.data.count += 1
      this.el.setAttribute('material', 'time', this.data.count * 0.05)
    }
  })

  AFRAME.registerComponent('rotator', {
    schema: {},
    init: function () {
      this.data.count = 0
    },
    tick: function () {
      this.data.count += 1
      const currentRotation = this.el.getAttribute('rotation');
      this.el.setAttribute('rotation', new THREE.Vector3(0, currentRotation.y + 1, 0))
    }
  })

  AFRAME.registerShader('time-gradation-shader', {
    schema: {
      time: { type: 'float', default: 0.0, is: 'uniform' }
    },
    vertexShader: [
      'varying vec2 vUV;',
      'uniform float time;',
      '',
      'void main(void) {',
      '    //position: vec3([-0.5 ~ 0.5], [-0.5 ~ 0.5], [-0.5 ~ 0.5])',
      '    float Pi = 3.141592;',
      '',
      '    float tx = position.x * (abs(sin(position.y * Pi + time)) * 0.4 + 0.6);',
      '    float ty = position.y;',
      '    float tz = position.z * (abs(sin(position.y * Pi + time)) * 0.4 + 0.61);',
      '',
      '    vec3 transform = vec3(tx, ty, tz);',
      '',
      '    gl_Position = projectionMatrix * modelViewMatrix * vec4(transform, 1.0);',
      '    vUV = uv;',
      '}',
    ].join("\n"),
    fragmentShader: [
      'varying vec2 vUV; // [0.0, 0.0] ~ [1.0, 1.0]',
      'uniform float time;',
      'void main(void) {',
      '  vec2 p = (vUV * 2.0) - vec2(1.0, 1.0); // [-1.0, 1.0] ~ [1.0, 1.0]',
      '  float x = p[0];',
      '  float y = p[1];',
      '  gl_FragColor = vec4(sin(time * 3.0) * 0.5 + 0.5, sin(time * 2.0) * 0.5 + 0.5, sin(time) * 0.5 + 0.5, 0.9); //(Red, Green, Blue, Alpha)',
      '}',
    ].join("\n"),
  })
}

main()

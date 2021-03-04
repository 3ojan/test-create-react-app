import React, { useEffect, useState, useRef } from 'react';
import * as THREE from "three";
import image1 from 'assets/img/1.jpg';
import image2 from 'assets/img/2.jpg';
import image3 from 'assets/img/3.jpg';
import image4 from 'assets/img/4.jpg';
import image5 from 'assets/img/5.jpg';
import image6 from 'assets/img/6.jpg';
import transitionImage1 from 'assets/img/8-7.jpg';
import transitionImage2 from 'assets/img/8-3.jpg';
import transitionImage3 from 'assets/img/8-18.jpg';
import transitionImage4 from 'assets/img/8-24.jpg';
import transitionImage5 from 'assets/img/8-30.jpg';
import transitionImage6 from 'assets/img/8-36.png';
import transitionImage7 from 'assets/img/8-19.jpg';
import transitionImage8 from 'assets/img/8-38.jpg';

import gsap from 'gsap';
import { start } from '@popperjs/core';

const createScript = () => {
  return <script></script>
}

const fragmentShader = `

       varying vec2 vUv;

        uniform float iTime;

        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D disp;
        uniform bool translateY;

        // uniform float time;
        uniform float _rot;
        uniform float dispFactor;
        uniform float effectFactor;
        vec2 u_resolution = vec2 (1.0,1.0) ;


        const float PI = 3.1415926535;

        vec2 rotate(vec2 v, float a) {
         float s = sin(a);
         float c = cos(a);
         mat2 m = mat2(c, -s, s, c);
         return m * v;
        }
		
        float rand(vec3 n){
                return fract(abs(sin(dot(n,vec3(4.3357,-5.8464,6.7645))*52.47))*256.75+0.325*sin(iTime));   
        }
        
        vec4 noise(){
          //gradient pattern color
                vec3 p = vec3(gl_FragCoord.xy+vec2(.5)*64.0,0.0);
                float b = (rand(floor(p/64.0))*0.5+rand(floor(p/64.0))*0.3+rand(floor(p/16.0))*0.2);
                return vec4(vec3(b),1.0);
        }

        vec4 simpleRadialGradient() {
        	vec2 p =  vUv.xy / u_resolution.xy ;
          p *= 13.0;      // Scale up the space by 3
          p = fract(p); // Wrap arround 1.0
          float x = 0.0;
          x = distance(p, vec2(0.5, 0.5));
          return vec4(1.0 -x, 1.0- x, 1.0-x, 1);
        }

        vec4 linear() {
            vec2 u_resolution = vec2 (1.0,1.0) ;

            vec2 center = u_resolution.xy/2.0;
            vec2 uv = vUv.xy - center;
            
            float angle = atan(uv.y, uv.x + sin(dispFactor - .5));
            //iTime gives rotation + fract pieces
            float color = fract(iTime*1.5 + 7.5*(angle/PI));
            
            return vec4(color);
                   
        }

        void main() {

            vec2 uv = vUv;

            // uv -= 0.5;
            // vec2 rotUV = rotate(uv, _rot);
            // uv += 0.5;

            vec4 disp = texture2D(disp, uv);

            //  disp = noise();
            // disp = simpleRadialGradient();
            // disp = linear();

            vec2 distortedPosition = vec2(uv.x  , uv.y+ dispFactor * (disp.r*effectFactor));
            vec2 distortedPosition2 = vec2(uv.x  , uv.y- (1.0 - dispFactor) * (disp.r*effectFactor));
            if (translateY == true){
              distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor)/2., uv.y+ dispFactor * (disp.r*effectFactor));
              distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor)/2. , uv.y- (1.0 - dispFactor) * (disp.r*effectFactor));
            }

            vec4 _texture = texture2D(texture1, distortedPosition);
            vec4 _texture2 = texture2D(texture2, distortedPosition2);

            vec4 finalTexture = mix(_texture, _texture2, dispFactor);

            gl_FragColor = finalTexture;
            // gl_FragColor = disp;
        }
  `;

const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;

const createOption = () => {

}
const createEasingOption = () => {

}
const createTransitionOption = () => {

}
const getEasingFunction = () => {

}

function useDidUpdate(callback, deps) {
  const hasMount = useRef(false)
  useEffect(() => {
    if (hasMount.current) {
      callback()
    } else {
      hasMount.current = true
    }
  }, deps)
}

function ThreeLayer(props) {


  var blurX = 1;
  var translateX = 1;

  let mount = null;

  const didMountRef = useRef(false);
  const _blurX = useRef(blurX);
  const canvas = useRef(null);
  useDidUpdate(() => {
    _blurX.current = props.uniforms.blurX;
  });

  useEffect(() => {
    if (!didMountRef.current) {


      var w = 800
      var h = 700
      var curF = 0;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, w / h, 1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      const canvas = renderer.domElement;
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      // const geometry = new THREE.PlaneGeometry(w / 100, h / 100);

      var geometry = new THREE.PlaneBufferGeometry(
        w / 100,
        h / 100,
        1
      );

      camera.position.z = 1.9;
      renderer.setClearColor("#000000");
      // renderer.setSize(w, h);

      canvas.current = renderer.domElement;
      mount.appendChild(canvas.current);
      didMountRef.current = true;

      var t1 = null;
      var t2 = null;
      var t3 = null;
      var t4 = null;
      var t5 = null;
      var t6 = null;
      t1 = new THREE.TextureLoader().load(image1, (image) => { });
      t2 = new THREE.TextureLoader().load(image2, (image) => { });
      t3 = new THREE.TextureLoader().load(image3, (image) => { });
      t4 = new THREE.TextureLoader().load(image4, (image) => { });
      t5 = new THREE.TextureLoader().load(image5, (image) => { });
      t6 = new THREE.TextureLoader().load(image6, (image) => { });

      const textures = [t1, t2, t3, t4, t5, t6];



      var disp = new THREE.TextureLoader().load(transitionImage1);
      disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

      var disp2 = new THREE.TextureLoader().load(transitionImage2);
      disp2.wrapS = disp2.wrapT = THREE.RepeatWrapping;
      var disp3 = new THREE.TextureLoader().load(transitionImage3);
      disp3.wrapS = disp3.wrapT = THREE.RepeatWrapping;
      var disp4 = new THREE.TextureLoader().load(transitionImage4);
      disp4.wrapS = disp4.wrapT = THREE.RepeatWrapping;
      var disp5 = new THREE.TextureLoader().load(transitionImage5);
      disp5.wrapS = disp5.wrapT = THREE.RepeatWrapping;
      var disp6 = new THREE.TextureLoader().load(transitionImage6);
      disp6.wrapS = disp6.wrapT = THREE.RepeatWrapping;
      var disp7 = new THREE.TextureLoader().load(transitionImage7);
      disp7.wrapS = disp7.wrapT = THREE.RepeatWrapping;
      var disp8 = new THREE.TextureLoader().load(transitionImage8);
      disp8.wrapS = disp8.wrapT = THREE.RepeatWrapping;

      let transitionImages = [disp, disp2, disp3, disp5, disp6, disp7, disp8, ...textures];

      t1.magFilter = t2.magFilter = THREE.LinearFilter;
      t1.minFilter = t2.minFilter = THREE.LinearFilter;

      t1.anisotropy = renderer.getMaxAnisotropy();
      t2.anisotropy = renderer.getMaxAnisotropy();


      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }


      let time = 0;

      const gsapValue = {
        time: 0,
      };
      let duration = 2000;


      function render(time) {
        // TWEEN.update(time);
        const fps = 1 / 60;
        time += fps;
        const iTime = material.uniforms.iTime.value;
        renderer.render(scene, camera);
        material.uniforms.iTime.value += fps;
        // material.uniforms.dispFactor.value = Math.abs(Math.sin(time / duration));
        material.uniforms.dispFactor.value = gsapValue.time / duration;

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        requestAnimationFrame(render);
      };

      var intensity = .5;
      var speedIn = 1.6;
      var speedOut = 1.2;

      var material = new THREE.ShaderMaterial({
        uniforms: {
          effectFactor: { type: "f", value: intensity },
          dispFactor: { type: "f", value: 0.1 },
          texture1: { type: "t", value: t1 },
          texture2: { type: "t", value: t2 },
          disp: { type: "t", value: disp },
          iTime: { type: "f", value: .5 },
          translateY: { type: "b", value: false },
        },

        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        opacity: 1.0
      });

      var textureIndex = Math.floor(Math.random() * textures.length);
      var newTextureIndex;

      const changeTexture = () => {
        const dispIndex = Math.floor(Math.random() * transitionImages.length);
        while (textureIndex === newTextureIndex) {
          newTextureIndex = Math.floor(Math.random() * textures.length);
        }
        textureIndex = newTextureIndex;
        material.uniforms.texture1 = { type: "t", value: textures[textureIndex] };
        material.uniforms.disp = { type: "t", value: transitionImages[dispIndex] };
        material.uniforms.translateY = { type: "b", value: false };
        if (dispIndex === 0) {
          material.uniforms.translateY = { type: "b", value: true };
        }
      }

      const startAnim = () => {
        gsap.to(gsapValue, 4, {
          time: duration, onComplete: () => {
            changeTexture();
            endAnim();
          },
          delay: .5,
        })
      };
      const endAnim = () => {
        gsap.to(gsapValue, 4, {
          time: 0, onComplete: () => {
            // changeTexture();
            startAnim();
          },
          delay: .5,
        })
      }
      changeTexture();
      startAnim();

      var slide = new THREE.Mesh(geometry, material);

      scene.add(slide);
      scene.background = new THREE.Color('#FFFFFF')


      requestAnimationFrame(render);
    }
  }, []);

  return (
    <div className="absolute top-0 w-full h-full bg-center bg-cover" ref={ref => (mount = ref)} />
  );

}
export default ThreeLayer
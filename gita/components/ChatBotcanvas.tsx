"use client"
import { Box } from '@react-three/drei'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { OrbitControls, SpotLight, useAnimations, useGLTF } from '@react-three/drei/core'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Mesh,BoxGeometry, Vector3 } from 'three'
import { AppContext } from '@/app/context/context'

export const ChatBotcanvas = () => {

  const {isplay,setisplay}=useContext(AppContext);
  const Torch=({vec=new Vector3(),...props})=>{
    const light=useRef<THREE.SpotLight>(null);
    const viewport=useThree(state=>state.viewport)
    useFrame((state)=>{
      light.current?.target.position.lerp(vec.set((state.mouse.x * viewport.width )/2,(state.mouse.y*viewport.width) /2,0),0.1);
      light.current?.target.updateMatrix()
    })
    return(
<SpotLight ref={light}
      castShadow
      penumbra={1}
      distance={10}
      angle={0.35}
      anglePower={4}
      attenuation={5}
      intensity={3}
      {...props}
    />

      
    )
  }

    const Head=()=>{
        const model=useGLTF("/head.glb");
        console.log(model);

        const animation=useAnimations(model.animations,model.scene);
        const action=animation.actions.Animation;
        
        useEffect(()=>{
          if(isplay){

            

            setTimeout(() => {
              action?.play();
            }, 200);
            
          }
          else{
            action?.fadeOut(1);
            setTimeout(() => {
              action?.stop();
            }, 3000);
          }
        },[isplay,action])

        return(
        <>
        {/* <primitive object={model.scene} scale={3} rotation-z={0.2} />; for skull  */}
        <primitive object={model.scene} scale={2} rotation-x={1.2} />;
          <Torch position={[3,2,2]} color="white"/>
          <Torch position={[-3,2,2]} color="white"/>
        </>
        )
    }

  return (
<Canvas>
    <OrbitControls enableDamping enableZoom={false} maxPolarAngle={2} minAzimuthAngle={-Math.PI*0.5} maxAzimuthAngle={Math.PI*0.5} />
    <ambientLight intensity={0.3}/>
    <Head/>
    </Canvas>
  )
}

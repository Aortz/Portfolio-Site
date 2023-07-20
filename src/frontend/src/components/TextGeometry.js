import React from 'react'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { extend } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Kolker from '../assets/Kolker Brush_Regular.json'

extend({ TextGeometry })

export default function Text(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
      // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const font = new FontLoader().parse(Kolker);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (
        ref.current.rotation.y += delta/2 
    ))
    return(
    <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.2 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
    >
        <textGeometry args={['Welcome to my horror house!', {font, size:0.5, height: 0}]}/>
        <meshLambertMaterial attach='material' color={hovered ? 'red' : 'grey'}/>
    </mesh>
    )
}
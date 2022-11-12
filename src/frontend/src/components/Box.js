import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.2 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <icosahedronGeometry args={[1,2]} />
      {/* <ambientLight /> */}
      {/* <pointLight position={[10, 10, 10]} /> */}
      <meshStandardMaterial color={hovered ? 'hotpink' : 'yellow'} />
    </mesh>
  )
}
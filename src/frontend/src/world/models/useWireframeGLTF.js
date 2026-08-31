import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Box3, Sphere, Vector3, MeshBasicMaterial } from 'three';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils';
import { useTheme } from 'styled-components';

export const DRACO_PATH = '/draco/';

/* ---------------------------------------------------------------------------
   Shared loader for every wireframe GLB in the world.

   - Uses SkeletonUtils.clone so rigged models (RECON-2) keep their skeleton
     bound to the copy; a plain scene.clone() renders skinned meshes at the
     source's transform.
   - Fits the model to either a bounding-sphere radius (rotation-invariant,
     good for things that spin/yaw) or a longest-axis size.
   - Replaces every material with an accent-coloured wireframe that follows
     theme changes.
   --------------------------------------------------------------------------- */
export default function useWireframeGLTF(url, { radius, maxDim, opacity = 0.7, textured = false } = {}) {
  const theme = useTheme();
  const { scene } = useGLTF(url, DRACO_PATH);

  const object = useMemo(() => {
    const c = skeletonClone(scene);
    c.updateMatrixWorld(true);
    c.traverse((o) => { if (o.isSkinnedMesh) o.computeBoundingBox(); });

    const bbox = new Box3().setFromObject(c);
    let scale = 1;
    let center;
    if (radius) {
      const sphere = new Sphere();
      bbox.getBoundingSphere(sphere);
      scale = radius / (sphere.radius || 1);
      center = sphere.center;
    } else {
      const size = new Vector3();
      bbox.getSize(size);
      const m = Math.max(size.x, size.y, size.z) || 1;
      scale = (maxDim || 1) / m;
      center = bbox.getCenter(new Vector3());
    }
    c.scale.setScalar(scale);
    c.position.sub(center.clone().multiplyScalar(scale));
    c.updateMatrixWorld(true);
    return c;
  }, [scene, radius, maxDim]);

  useEffect(() => {
    if (textured) {
      // Keep the GLB's own materials, but metallic PBR is near-black without
      // an environment map — clamp toward diffuse so scene lights land.
      object.traverse((child) => {
        if (child.isMesh && child.material) {
          const m = child.material;
          if ('metalness' in m) m.metalness = Math.min(m.metalness, 0.25);
          if ('roughness' in m) m.roughness = Math.max(m.roughness, 0.55);
        }
      });
      return;
    }
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshBasicMaterial({
          color: theme.color.accent,
          wireframe: true,
          transparent: true,
          opacity,
        });
      }
    });
  }, [object, theme.color.accent, opacity, textured]);

  return object;
}

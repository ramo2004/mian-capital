import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

const palettes = {
  hero: {
    color1: "#fbf6ea",
    color2: "#dbe88d",
    color3: "#b99355",
    brightness: 1.12,
    strength: 0.82,
    density: 0.72,
    speed: 0.035,
    rotation: 28,
  },
};

export default function ShaderAtmosphere({ variant, reducedMotion }) {
  const palette = palettes[variant];

  return (
    <div className={`shader-atmosphere shader-atmosphere-${variant}`}>
      <ShaderGradientCanvas
        className="shader-canvas"
        fov={45}
        pixelDensity={Math.min(window.devicePixelRatio, 1.25)}
        pointerEvents="none"
        powerPreference="low-power"
      >
        <ShaderGradient
          animate={reducedMotion ? "off" : "on"}
          brightness={palette.brightness}
          cAzimuthAngle={210}
          cDistance={3.5}
          cPolarAngle={88}
          cameraZoom={1}
          color1={palette.color1}
          color2={palette.color2}
          color3={palette.color3}
          grain="off"
          lightType="3d"
          positionX={-0.2}
          positionY={0}
          positionZ={0}
          reflection={0.08}
          rotationX={58}
          rotationY={0}
          rotationZ={palette.rotation}
          type="waterPlane"
          uAmplitude={0.42}
          uDensity={palette.density}
          uFrequency={1.45}
          uSpeed={palette.speed}
          uStrength={palette.strength}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}

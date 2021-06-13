//@flow
import React, { createRef } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import Form from "react-bootstrap/Form";
import { Blur } from "./Blur";
import GLImage from "gl-react-image";

const shaders = Shaders.create({
  Saturate: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float contrast, saturation, brightness;
const vec3 L = vec3(0.2125, 0.7154, 0.0721);
void main() {
  vec4 c = texture2D(t, uv);
	vec3 brt = c.rgb * brightness;
	gl_FragColor = vec4(mix(
    vec3(0.5),
    mix(vec3(dot(brt, L)), brt, saturation),
    contrast), c.a);
}
`,
  },
});

export const Saturate = ({ contrast, saturation, brightness, children }) => (
  <Node
    shader={shaders.Saturate}
    uniforms={{ contrast, saturation, brightness, t: children }}
  />
);

const Filter = (props) => {
  const ref = createRef();
  // const { width, height } = useResize(ref);
  return (
    <div ref={ref} style={{ border: "3px black solid" }}>
      <Surface
        style={{ border: "3px purple solid" }}
        // height="100%"
        // height="800"
        // width="700"
        // width="100%"
      >
        <Saturate {...props}>
          <Blur passes={6} factor={props.blur}>
            <GLImage source={props.image} resizeMode="contain" />
          </Blur>
        </Saturate>
      </Surface>
    </div>
  );
};

export default Filter;

//@flow
import React, { Component, useState } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import Form from "react-bootstrap/Form";
import { Blur } from "./Blur";

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

const Filter = ({ image }) => {
  const [filters, setFilters] = useState({
    contrast: 1,
    saturation: 1,
    brightness: 1,
    blur: 0,
  });
  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  return (
    <>
      <Surface width={480} height={300}>
        <Saturate {...filters}>
          <Blur passes={6} factor={filters.blur}>
            {image}
            {/* https://i.imgur.com/uTP9Xfr.jpg */}
          </Blur>
        </Saturate>
      </Surface>
      <Form.Label>Contrast</Form.Label>
      <Form.Control
        type="range"
        min="0"
        max="2"
        step="0.01"
        name="contrast"
        value={filters.contrast}
        onChange={handleChange}
      />
      <Form.Label>Saturation</Form.Label>
      <Form.Control
        type="range"
        min="0"
        max="2"
        step="0.01"
        name="saturation"
        value={filters.saturation}
        onChange={handleChange}
      />
      <Form.Label>Brightness</Form.Label>
      <Form.Control
        type="range"
        min="0"
        max="2"
        step="0.01"
        name="brightness"
        value={filters.brightness}
        onChange={handleChange}
      />
      <Form.Label>Blur</Form.Label>
      <Form.Control
        type="range"
        min="0"
        max="5"
        step="0.01"
        name="blur"
        value={filters.blur}
        onChange={handleChange}
      />
    </>
  );
};

export default Filter;

---
title: "2D Game Engine with DirectX11 Pipeline : Just Shapes and Beats"
---

# 2D Game Engine with DirectX11 Pipeline : Just Shapes and Beats

|          |                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| Period   | May 2023 ~ Oct 2023                                                                                         |
| Stack    | C++, DirectX11, WinAPI                                                                                      |
| Platform | Windows                                                                                                     |
| Team     | Solo                                                                                                        |
| GitHub   | [Luci-Park/JustShapesAndBeats_Clone_DirectX](https://github.com/Luci-Park/JustShapesAndBeats_Clone_DirectX) |
| Video    | [YouTube](https://youtu.be/2EQH4TvCqfU)                                                                     |

In the previous engine I was still using WinAPI's built-in drawing methods.
This one was about going further — learning what a graphics API actually
was, and building the rendering pipeline myself using DirectX11.

Just Shapes and Beats was a good target for this. It's heavy on effects
and particles, which meant I had to actually learn shaders to pull it off.
Learning the API and how graphics worked for the first time was fun —
debugging it was a different story.

## Graphics Pipeline

`Mesh` binds vertex data to the shader. `Material` handles `Texture` and
`Shader` binding, and passes tint and size data to a Compute Shader.
Each `Texture` creates and stores its own view. `Shader` manages the
binding of pipeline stages.

## Particle System

Manages particle shape, motion, and lifetime. `RateOverDistance` varies
particle count based on player movement speed — this was needed to make
the player trail feel responsive rather than just time-based.

## Collision

OBB collision detection using the Separating Axis Theorem, supporting
rotated rectangles and circles.

## Animator

Keyframe-based animation for `Transform`, `Collider`, and `MeshRenderer`
properties, with linear interpolation between frames. Supports timed
function callbacks for syncing game events to animation.

One thing I ran into: putting `shared_ptr` and `std::function` inside a
`Union` caused access errors because Union skips initialization. Splitting
them into separate structs fixed it — and taught me to be careful with
complex types in Unions.

## Beat System

Same beat-driven approach as the previous engine. `MusicController` owns
song time, `MusicManager` schedules bullet patterns, and each `Bullet`
runs through a state machine — Waiting, Warning, Activate, Outro,
DeActivate. A `BulletPool` recycles instances to keep allocation overhead low.

## What I Learned

Going from WinAPI drawing to a real graphics API was a big step. The
pipeline itself made sense once I understood the stages — but graphics
debugging was hard. No stack traces, just wrong pixels. It got me in the
habit of isolating each stage and testing incrementally.
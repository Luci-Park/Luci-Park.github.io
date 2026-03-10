---
title: "2D Game Engine : Crypt of the Necrodancer"
---

# Crypt of the Necrodancer Clone

|          |                                                                                       |
| -------- | ------------------------------------------------------------------------------------- |
| Period   | Feb 2023 ~ May 2023                                                                   |
| Stack    | C++, WinAPI                                                                           |
| Platform | Windows                                                                               |
| Team     | Solo                                                                                  |
| GitHub   | [Luci-Park/CryptOfTheNecrodancer](https://github.com/Luci-Park/CryptOfTheNecrodancer) |
| Video    | [YouTube](https://youtu.be/2EQH4TvCqfU)                                               |

This was my first engine project. I wanted to learn WinAPI and understand
how a game loop actually worked underneath Unity — so I picked a game I
liked, reverse engineered it, and built it from scratch.

Crypt of the Necrodancer was a good choice for this. It has a lot of
interesting systems to figure out: procedural dungeon generation, beat
synchronization, lighting — each one was a problem I had to think through
from first principles.

## Dungeon Generation

Each dungeon is a chain of up to 6 rooms connected by corridors. I used
DFS to place rooms one at a time — each room gets inserted in a random
direction from the previous one, backtracking when no valid position exists.
Room types and sizes are randomized, with fixed slots for the start and
exit rooms.

## Beat Synchronization

Getting the timing right was harder than I expected. My first attempt had
every object tracking its own clock — they all drifted. The fix was a
central `Conductor` class that owns the song position in beats. Everything
else derives from `BeatObject` and receives callbacks through the Observer
pattern. Input is validated by a `BeatJudge` within a ±0.3 beat window,
and positions are linearly interpolated between beats to keep movement smooth.

## Lighting

Each tile's visibility is calculated using Bresenham's line algorithm from
the player's position. Illumination is interpolated between inner and outer
light radii. Shadow is a black quad with alpha driven by the light value.

## What I Learned

Beat-driven timing, not time-driven. The Observer pattern for decoupling
systems. And that reverse engineering a game you know well is a surprisingly
good way to learn — you always have a reference for whether something is
working.
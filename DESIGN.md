---
version: alpha
name: wddfach
description: "Cosmic portfolio system for UI, 3D, and game concept work."
colors:
  primary: "#ffaa3c"
  secondary: "#45d6e8"
  tertiary: "#b98cff"
  background: "#04050a"
  surface: "#0d1120"
  text: "#eaeef8"
  muted: "#a7b0c8"
  line: "#1f2740"
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: "4rem"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  heading:
    fontFamily: Space Grotesk
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  body:
    fontFamily: Plus Jakarta Sans
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: JetBrains Mono
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section-mobile: 64px
  section-desktop: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#12100c"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
---

## Overview

wddfach is an original dark cosmic portfolio system. The primary surface is Decide/Learn on the homepage, Explore for the work catalogue, Compare for services, Configure for checkout, and Operate for admin. Cosmic effects establish atmosphere without becoming the content.

## Colors

Ember is the primary action color. Ion cyan and plasma violet are secondary accents for 3D light, status, and rare emphasis. Deep surfaces and quiet borders carry most of the interface. Never use the accents as large text fields or full-page gradients.

## Typography

Space Grotesk creates the display voice for headings. Plus Jakarta Sans keeps long Indonesian and English copy legible. JetBrains Mono is restricted to metadata, labels, order codes, and technical values. Body copy stays around 15–16px with generous line-height; metadata never carries critical instructions alone.

## Layout

Use a 76rem outer shell, a 4/8 spacing rhythm, and consistent left alignment. Homepage sections land one idea at a time. Work cards use consistent image ratios. Hero copy stays within a readable measure and the primary CTA is visually singular.

## Elevation & Depth

Use one border and one quiet surface change before adding blur. Blur is reserved for sticky navigation and overlays. The cosmic background is layered behind content and never used as a card background that reduces contrast.

## Shapes

Cards use 12–16px radius; actions use pill radius; image corners follow the parent card. Avoid adding a rounded container when spacing and alignment already provide grouping.

## Components

Primary actions use ember with dark text. Secondary actions are outlined and lower-emphasis. Labels use mono uppercase sparingly. Every interactive element has a visible focus state and at least 44px touch area.

## Do's and Don'ts

- Do use supplied portfolio images and real copy.
- Do provide ID and EN values for every visible content string.
- Do keep the background cosmic, gradient-led, and restrained.
- Do use a CSS fallback when WebGL is unavailable.
- Do not make a planet the default hero or page wallpaper.
- Do not call an AI concept image a production 3D model.
- Do not add decorative metrics or equal-weight feature-card grids without a user task.
- Do not place payment secrets in public code.

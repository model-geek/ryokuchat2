import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import green from "@park-ui/panda-preset/colors/green";
import sage from "@park-ui/panda-preset/colors/sage";

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/dev/presets",
    createPreset({
      accentColor: green,
      grayColor: sage,
      radius: "sm",
    }),
  ],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  outdir: "styled-system",
});

export const tailwindcssKeyFrames = {
  "gradient-y": {
    "0%, 100%": {
      "background-size": "400% 400%",
      "background-position": "center top",
    },
    "50%": {
      "background-size": "200% 200%",
      "background-position": "center center",
    },
  },
  "gradient-x": {
    "0%, 100%": {
      "background-size": "200% 200%",
      "background-position": "left center",
    },
    "50%": {
      "background-size": "200% 200%",
      "background-position": "right center",
    },
  },
  "gradient-xy": {
    "0%, 100%": {
      "background-size": "400% 400%",
      "background-position": "left center",
    },
    "50%": {
      "background-size": "200% 200%",
      "background-position": "right center",
    },
  },
  blob: {
    "0%, 100%": {
      transform: "translate(0px, 0px) scale(1)",
    },
    // transform position and scale
    "33.33%": {
      transform: "translate(30px, -50px) scale(1.5)",
    },
    "66.6%": {
      transform: "translate(-20px, 30px) scale(1)",
    },
  },
  progress: {
    "0%": {
      width: "0%",
    },
    "100%": {
      width: "100%",
    },
  },
  tilt: {
    "0%, 100%": {
      transform: "rotate(0deg)",
    },
    "25%": {
      transform: "rotate(5deg)",
    },
    "75%": {
      transform: "rotate(-5deg)",
    },
  },
}

export const tailwindcssAnimations = {
  "spin-slow": "spin 3s linear infinite",
  blob: "blob 20s ease-in-out infinite",
  "gradient-x": "gradient-x 15s ease-in-out infinite",
  "gradient-y": "gradient-y 15s ease-in-out infinite",
  "gradient-xy": "gradient-xy 15s linear infinite",
  progress: "progress 15s linear infinite",
  tilt: "tilt 10s linear infinite",
}

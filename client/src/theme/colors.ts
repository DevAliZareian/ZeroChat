const colors = {
  light: {
    layout: {
      background: "#ffffff",
      surface: "#fefefe",
      border: "#e9e9e9",
      sidebar: "#f9f9f9",
    },
    text: {
      primary: "#2B2B2B",
      secondary: "#7c7c7c",
      muted: "#E2E2E2ff",
      links: "#A0A5D4ff",
    },
    chat: {
      incoming: "#EDEEF7ff",
      outgoing: "#F7F7F8ff",
    },
    accent: {
      blue: "#5B62B6ff",
      deactive: "#BABDDFff",
    },
  },
  dark: {
    layout: {
      background: "#121212", // Deeper base for better contrast
      surface: "#1e1e1e", // Slightly lighter than background
      border: "#3d3d3d", // Softer border color
      sidebar: "#252525", // Distinct from main surface
    },
    text: {
      primary: "#ffffff", // Pure white for best readability
      secondary: "#cccccc", // Higher contrast than before
      muted: "#888888", // Clearly visible but subtle
      links: "#9aa5ff", // Softer blue with better visibility
    },
    chat: {
      incoming: "linear-gradient(135deg, #1e202c, #2a2d3a)", // dark neutral
      outgoing: "linear-gradient(135deg, #353856, #3e435e)", // subtle depth
    },
    accent: {
      blue: "#76FF03", // More vibrant blue
      deactive: "#5a5d72", // Better differentiation from active
    },
    // Added new categories for completeness:
    state: {
      hover: "#2e2e2e",
      active: "#3a3a3a",
      focus: "#4a4a4a",
    },
    special: {
      error: "#ff6b6b",
      success: "#66bb6a",
      warning: "#ffa726",
    },
  },
};

export default colors;

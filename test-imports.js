// test-imports.js
console.log("Testing imports...");

try {
  // Test relative import
  const Player = require('./components/Player.jsx');
  console.log("✅ Relative import works:", Player ? "SUCCESS" : "FAILED");
} catch (error) {
  console.log("❌ Relative import failed:", error.message);
}

try {
  // This won't work in Node, but we can check the file exists
  const fs = require('fs');
  const path = require('path');
  
  const componentPath = path.join(__dirname, 'components', 'Player.jsx');
  if (fs.existsSync(componentPath)) {
    console.log("✅ File exists at:", componentPath);
  } else {
    console.log("❌ File not found at:", componentPath);
  }
} catch (error) {
  console.log("❌ File check failed:", error.message);
}

console.log("Hello from Node!");
try {
  console.log("Current directory:", process.cwd());
} catch (e) {
  console.error("Error getting current working directory:", e);
}

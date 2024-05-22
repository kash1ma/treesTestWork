import { mkdir, mkfile } from "@hexlet/immutable-fs-trees";

function createFS() {
  const fileSystem = mkdir(
    "nodejs-package",
    [
      mkfile("Makefile"),
      mkfile("README.md"),
      mkdir("dist", []),
      mkdir("__tests__", [mkfile("half.test.js", { type: "text/javascript" })]),
      mkfile("babel.config.js", { type: "text/javascript" }),
      mkdir(
        "node_modules",
        [mkdir("@babel", [mkdir("cli", [mkfile("LICENSE")])])],
        { owner: "root", hidden: false }
      ),
    ],
    { hidden: true }
  );

  return fileSystem;
}

function traverseTree(root) {
  if (!root || !root.children) return undefined;

  console.log(root.name);

  for (const item of root.children) {
    if (item.type === "directory") {
      console.log(item.name);
      traverseTree(item);
    } else if (item.type === "file") {
      console.log(item.name);
    }
  }
}

console.log(traverseTree(createFS()));

import {
  mkdir,
  mkfile,
  getChildren,
  getMeta,
  isDirectory,
  isFile,
  map,
} from "@hexlet/immutable-fs-trees";
import _ from "lodash";

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

const tree = createFS();

function traverseTree(root) {
  if (!root || !root.children) return;

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

function changeOwner(tree, owner) {
  if (!tree || !tree.children) return;

  for (const item of tree.children) {
    if (item.type === "directory") {
      changeOwner(item, owner);
    } else if (item.type === "file") {
      item.owner = owner;
    }
  }

  return tree;
}
console.log(changeOwner(createFS(), "hatori hanzo"));
function getNodesCount(tree) {
  if (isFile(tree)) {
    return 1;
  }
  const children = getChildren(tree);
  const descendantsCount = children.map(getNodesCount);
  return 1 + descendantsCount.reduce((a, b) => a + b, 0);
}
console.log(getNodesCount(createFS()));

function getDirectorysCount(tree) {
  if (isDirectory(tree)) {
    const children = getChildren(tree);
    const descendantsCount = children.map(getDirectorysCount);
    return 1 + descendantsCount.reduce((a, b) => a + b, 0);
  }
  return 0;
}

console.log(getDirectorysCount(tree));

function countFilesInDirectory(tree) {
  if (isDirectory(tree)) {
    const children = getChildren(tree);
    const descendantsCount = children.map(countFilesInDirectory);
    return descendantsCount.reduce((a, b) => a + b, 0);
  }
  if (isFile(tree)) {
    return 1;
  }
  return 0;
}

console.log(countFilesInDirectory(tree));

"use strict";
function parseInput(input) {
    const lines = input.trim().split("\n");
    const graph = new Map();
    for (const line of lines) {
        const [from, to, distance] = line
            .split(",")
            .map((s) => s.trim())
            .map(Number);
        if (!graph.has(from)) {
            graph.set(from, []);
        }
        graph.get(from).push({ from, to, distance });
    }
    return graph;
}
function findLongestPath(graph) {
    let longestPath = [];
    let maxLength = 0;
    function dfs(current, visited, path, length, start) {
        if (length > maxLength) {
            maxLength = length;
            longestPath = [...path];
        }
        if (current == start)
            return;
        if (start == -1)
            start = current;
        const edges = graph.get(current) || [];
        for (const edge of edges) {
            if (!visited.has(edge.to) || edge.to == start) {
                visited.add(edge.to);
                path.push(edge.to);
                dfs(edge.to, visited, path, length + edge.distance, start);
                path.pop();
                visited.delete(edge.to);
            }
        }
    }
    for (const start of graph.keys()) {
        const visited = new Set();
        visited.add(start);
        dfs(start, visited, [start], 0, -1);
    }
    return longestPath;
}
function printPath(path) {
    console.log(path.join("\n"));
}
// Example usage:
const input = `
  1, 2, 8.54
  2, 3, 3.11
  3, 1, 2.19
  3, 4, 4
  4, 1, 1.4
  `;
const graph = parseInput(input);
const longestPath = findLongestPath(graph);
printPath(longestPath);

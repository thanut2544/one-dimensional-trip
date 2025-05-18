function minEnergy(start, shops, stations, target) {
  const queue = [
    { pos: start, visited: new Set(), energy: 0 },
  ];
  const visitedStates = new Set();
  const shopSet = new Set(shops);
  const stationSet = new Set(stations);

  while (queue.length > 0) {
    const { pos, visited, energy } = queue.shift();
    const key = `${pos}-${Array.from(visited).sort().join(',')}`;
    if (visitedStates.has(key)) continue;
    visitedStates.add(key);

    const newVisited = new Set(visited);
    if (shopSet.has(pos)) newVisited.add(pos);

    if (newVisited.size === shopSet.size && pos === target) {
      return energy;
    }

    if (pos - 1 >= 0) {
      queue.push({ pos: pos - 1, visited: newVisited, energy: energy + 1 });
    }

    queue.push({ pos: pos + 1, visited: newVisited, energy: energy + 1 });

    if (stationSet.has(pos)) {
      for (const s of stations) {
        if (s !== pos) {
          queue.push({ pos: s, visited: newVisited, energy });
        }
      }
    }
  }

  return -1;
}

function runTests() {
  const result1 = minEnergy(2, [4, 9], [3, 6, 8], 7);
  console.log("Test Got:", result1);
}

runTests();

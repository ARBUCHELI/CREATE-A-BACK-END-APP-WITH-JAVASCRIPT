// Drum Arrays
let kicks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let snares = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let hiHats = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let rideCymbals = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

function toggleDrum(drumType, index) {
    let isValidIndex = index >= 0 && index < 16;

    if (!isValidIndex) {
        console.error('Invalid index');
        return;
    }
    switch (drumType) {
      case 'kicks':
        kicks[index] = !kicks[index];
        break;
      case 'snares':
        snares[index] = !snares[index];
        break;
      case 'hiHats':
        hiHats[index] = !hiHats[index];
        break;
      case 'rideCymbals':
        rideCymbals[index] = !rideCymbals[index];
        break;
      default:
        console.error('Invalid array name');
    }
  }

function clear (drumType) {
    switch (drumType) {
        case 'kicks':
            for (let i = 0; i < kicks.length; i++) {
                kicks[i] = false;
            }
            break;
        case 'snares':
            for (let i = 0; i < snares.length; i++) {
                snares[i] = false;
            }
            break;
        case 'hiHats':
            for (let i = 0; i < hiHats.length; i++) {
                hiHats[i] = false;
            }
            break;
        case 'rideCymbals':
            for (let i = 0; i < rideCymbals.length; i++) {
                rideCymbals[i] = false;
            }
            break;
        default:
          console.error('Invalid array name');
      }
}

function invert(drumType) {
    switch (drumType) {
        case 'kicks':
            for (let i = 0; i < kicks.length; i++) {
                kicks[i] = !kicks[i];
            }
            break;
        case 'snares':
            for (let i = 0; i < snares.length; i++) {
                snares[i] = !snares[i];
            }
            break;
        case 'hiHats':
            for (let i = 0; i < hiHats.length; i++) {
                hiHats[i] = !hiHats[i];
            }
            break;
        case 'rideCymbals':
            for (let i = 0; i < rideCymbals.length; i++) {
                rideCymbals[i] = !rideCymbals[i];
            }
            break;
        default:
          console.error('Invalid array name');
      }
}

function getNeighborPads(x, y, size) {
    const neighbors = [];
  
    // Check if x and y are within the valid range
    if (x < 0 || x >= size || y < 0 || y >= size) {
      return neighbors; // Return empty array if x or y is outside the range
    }
  
    // Check left neighbor
    if (x > 0) {
      neighbors.push([x - 1, y]);
    }
  
    // Check right neighbor
    if (x < size - 1) {
      neighbors.push([x + 1, y]);
    }
  
    // Check bottom neighbor
    if (y > 0) {
      neighbors.push([x, y - 1]);
    }
  
    // Check top neighbor
    if (y < size - 1) {
      neighbors.push([x, y + 1]);
    }
  
    return neighbors;
  }
  
  
  









const simpleHashGenerator = string => {
  let hash = 0

  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);

    hash = (hash << 5) - hash + char // << is left shift operator 

    hash &= hash; // Convert to 32bit integer
  }
  return new Uint32Array([hash])[0].toString(36); // convert 32bit integer to string
}
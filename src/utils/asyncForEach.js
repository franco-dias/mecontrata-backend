export default async function asyncForEach(array, callback) {
  const ids = [];
  for (let i = 0; i < array.length; i += 1) {
    try {
      await callback(array[i], i, array);
      ids.push(array[i]);
    } catch (err) {
      console.error(err);
    }
  }
  return ids;
}

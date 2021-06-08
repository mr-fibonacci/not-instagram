import axios from "axios";

// the ternary bit needed only for development (localhost instead of gitpod's url)
export const setNext = (resource) => {
  return {
    ...resource,
    next: resource.next
      ? resource.next.replace("http://localhost:8000", axios.defaults.baseURL)
      : null,
  };
};

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axios.get(resource.next);
    setResource((prevResource) => ({
      ...setNext(data),
      results: data.results.reduce((acc, cur) => {
        return acc.some((result) => result.id === cur.id) ? acc : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.log(err.request);
  }
};

// const fetchMoreComments = async () => {
//   try {
//     const { data } = await axios.get(comments.next);
//     setComments((prevComments) => ({
//       ...data,
//       next: data.next
//         ? data.next.replace("http://localhost:8000", axios.defaults.baseURL)
//         : null,
//       results: data.results.reduce((acc, cur) => {
//         return acc.some((result) => result.id === cur.id)
//           ? acc
//           : [...acc, cur];
//       }, prevComments.results),
//     }));
//   } catch (err) {
//     console.log(err.request);
//   }
// };

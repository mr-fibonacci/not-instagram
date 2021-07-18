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

export const IMAGE_FILTERS = [
  { name: "1977", value: "_1977" },
  { name: "Brannan", value: "brannan" },
  { name: "Earlybird", value: "earlybird" },
  { name: "Hudson", value: "hudson" },
  { name: "Inkwell", value: "inkwell" },
  { name: "Lo-Fi", value: "lofi" },
  { name: "Kelvin", value: "kelvin" },
  { name: "no-filter", value: "normal" },
  { name: "Nashville", value: "nashville" },
  { name: "Rise", value: "rise" },
  { name: "Toaster", value: "toaster" },
  { name: "Valencia", value: "valencia" },
  { name: "Walden", value: "walden" },
  { name: "X-pro II", value: "xpro2" },
];

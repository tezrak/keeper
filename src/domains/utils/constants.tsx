export const constants = {
  site(props: { localhost: boolean }) {
    if (props.localhost) {
      return "http://localhost:4321";
    }
    return "https://storied.farirpgs.com";
  },
};

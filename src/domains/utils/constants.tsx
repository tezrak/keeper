export const constants = {
  site(props: { localhost: boolean }) {
    if (props.localhost) {
      return "http://localhost:4321";
    }
    return "https://keeper.farirpgs.com";
  },
};

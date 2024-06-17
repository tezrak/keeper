export const constants = {
  site(props: { localhost: boolean }) {
    if (props.localhost) {
      return "http://localhost:4321";
    }
    ("https://keeper.farirpgs.com");
  },
};

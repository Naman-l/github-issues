import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList: async function (page) {
    try {
      let url;
      if ((page != null) & (page > 1)) {
        url =
          "https://api.github.com/repos/facebook/create-react-app/issues?&page=" +
          page +
          "&per_page=20";
      } else {
        url =
          "https://api.github.com/repos/facebook/create-react-app/issues?&page=1&per_page=20";
      }
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

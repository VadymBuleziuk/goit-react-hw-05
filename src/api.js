import axios from "axios";

export default async function searchImages(input, currentPage) {
  try {
    const result = await axios.get("https://api.unsplash.com/search/photos/", {
      params: {
        client_id: "S3_fci44_OMTdc0fWi6xPHHEUOJXwIcEFzoDCLQD4UU",
        query: input,
        page: currentPage,
      },
    });
    return result.data.results;
  } catch {
    throw new Error("Failed to fetch images");
  }
}

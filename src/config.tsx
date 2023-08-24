const prodBaseUrl: string = "https://jittery-lime-woodpecker.cyclic.cloud";
const devBaseUrl: string = "http://localhost:5000";
const cloudinaryUrl: string =
  "https://api.cloudinary.com/v1_1/dfqau4u7l/image/upload";
const baseUrl: string =
  process.env.NODE_ENV === "production" ? prodBaseUrl : devBaseUrl;
export { baseUrl, cloudinaryUrl };

export const extractImagesWithTheirSource = (htmlString) => {
  const imgRegex = /<img.*?data-src="([^"]+)".*?>/g;
  const linkRegex = /<a.*?href="([^"]+)".*?>/g;

  const images = Array.from(htmlString.matchAll(imgRegex), (match) => match[1]);
  const urls = Array.from(htmlString.matchAll(linkRegex), (match) => match[1]);

  return images.map((item, index) => {
    if (images.length === urls.length) {
      return {
        image: item,
        src: urls[index],
      };
    }

    return {
      image: item,
      src: urls[0],
    };
  });
};

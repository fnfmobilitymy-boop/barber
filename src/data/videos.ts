// Owner-uploaded works. Hero media is configured separately.
export const showcaseVideos = Array.from({ length: 6 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `work-${number}`,
    title: `Spartans work ${number}`,
    src: `videos/showcase/work-${number}.mp4`,
    poster: `images/showcase/work-${number}.jpg`,
  };
});

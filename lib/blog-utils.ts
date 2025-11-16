export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const getGridClasses = (index: number) => {
  const mdPattern = index % 4;
  const lgGroupIndex = index % 3;

  const isMdFull = mdPattern === 0;
  const isLgLarge = lgGroupIndex === 0;

  return {
    container: `
      ${isMdFull ? "md:col-span-3" : "md:col-span-1"}
      ${
        isLgLarge
          ? "lg:col-span-2 lg:row-span-2"
          : "lg:col-span-1 lg:row-span-1"
      }
    `,
    image: `
      ${isMdFull ? "h-[300px] md:h-[400px]" : "h-[300px]"}
      ${isLgLarge ? "lg:h-[500px]" : "lg:h-[240px]"}
    `,
    title: `
      ${isMdFull ? "text-3xl md:text-4xl" : "text-2xl"}
      ${isLgLarge ? "lg:text-5xl" : "lg:text-xl"}
    `,
  };
};

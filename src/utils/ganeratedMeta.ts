type SEOProps = {
  title: string;
  description: string;
  url?: string;
  index?: boolean;
  follow?: boolean;
};

export const generateMetadata = ({
  title,
  description,
  url,
  index = true,
  follow = true,
}: SEOProps) => {
  return {
    title,
    description,
    robots: {
      index,
      follow,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Sawdia Electronics & Hardware",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};

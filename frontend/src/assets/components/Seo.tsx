// src/components/SEO.tsx
import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="task manager, gestion des tâches, React, Tailwind CSS" />
      <meta name="author" content="Frejus AGUESSY" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/images/icons/icons.png" />

      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;

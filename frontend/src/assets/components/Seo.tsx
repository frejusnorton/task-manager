// src/components/SEO.tsx
import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="task manager, gestion des tâches, React, Tailwind CSS" />
      <meta name="author" content="Frejus AGUESSY" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ton-site.com" />
      <meta property="og:image" content="https://ton-site.com/image.jpg" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default SEO;

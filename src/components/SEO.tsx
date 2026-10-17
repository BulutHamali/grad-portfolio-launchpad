import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}

export const SEO = ({
  title = "Bulut Hamali — Cloud & AI Infrastructure Engineer",
  description = "Bulut Hamali, PhD in Biochemistry and AWS Certified Solutions Architect – Associate. Cloud-based applications, AI tools, and workflows for scientific data.",
  canonical = "https://buluthamali.com",
  ogImage = "https://buluthamali.com/lovable-uploads/8c42eaae-f199-448f-a1f3-675e636cb3ed.png",
  ogType = "website",
  keywords = "Bulut Hamali, AWS Certified Solutions Architect Associate, AWS Certified Cloud Practitioner, cloud engineer, AI ML engineer, AWS, Terraform, computational biology, bioinformatics, former Nextflow Ambassador, single-cell RNA-seq, full-stack developer, Next.js, Python, multi-agent AI, PhD biochemistry"
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Bulut Hamali Portfolio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

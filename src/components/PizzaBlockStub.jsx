import React from 'react';
import ContentLoader from 'react-content-loader';

export const PizzaBlockStub = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="138" cy="138" r="138" />
    <rect x="0" y="289" rx="10" ry="10" width="280" height="26" />
    <rect x="1" y="334" rx="10" ry="10" width="280" height="88" />
    <rect x="8" y="444" rx="10" ry="10" width="95" height="35" />
    <rect x="42" y="455" rx="0" ry="0" width="2" height="0" />
    <rect x="128" y="439" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

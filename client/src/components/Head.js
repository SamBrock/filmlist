import React from 'react'
import { Helmet } from 'react-helmet';

import { site } from '../config';

export default function Head({ title, bodyAttributes }) {
  return <Helmet title={title} defaultTitle={site.defaultTitle} titleTemplate={`%s | ${site.defaultTitle}`} bodyAttributes={{ class: bodyAttributes }} />;
}

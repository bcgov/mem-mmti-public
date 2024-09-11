import type { Schema, Attribute } from '@strapi/strapi';

export interface PageFeatureBlock extends Schema.Component {
  collectionName: 'components_page_feature_blocks';
  info: {
    displayName: 'Feature Block';
    icon: 'grid';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Description: Attribute.String;
    page: Attribute.Relation<
      'page.feature-block',
      'oneToOne',
      'api::page.page'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'page.feature-block': PageFeatureBlock;
    }
  }
}

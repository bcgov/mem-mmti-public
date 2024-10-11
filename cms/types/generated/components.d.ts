import type { Schema, Attribute } from '@strapi/strapi';

export interface PageScrollButton extends Schema.Component {
  collectionName: 'components_page_scroll_buttons';
  info: {
    displayName: 'Scroll Button';
    description: '';
  };
  attributes: {
    Text: Attribute.String;
    Section_id: Attribute.String;
  };
}

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
      'page.scroll-button': PageScrollButton;
      'page.feature-block': PageFeatureBlock;
    }
  }
}

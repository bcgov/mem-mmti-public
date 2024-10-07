import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    social: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
  };
}

export interface LayoutHeader extends Schema.Component {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'NavLinks';
    description: '';
  };
  attributes: {
    link: Attribute.Component<'components.link', true>;
    nav_heading: Attribute.String;
  };
}

export interface LayoutFooterBar extends Schema.Component {
  collectionName: 'components_layout_footer_bars';
  info: {
    displayName: 'footer_bar';
    description: '';
  };
  attributes: {
    link: Attribute.Component<'components.link', true>;
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
      'components.link': ComponentsLink;
      'layout.header': LayoutHeader;
      'layout.footer-bar': LayoutFooterBar;
      'page.feature-block': PageFeatureBlock;
    }
  }
}

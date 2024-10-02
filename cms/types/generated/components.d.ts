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
  };
  attributes: {
    socials: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    link: Attribute.Component<'components.link', true>;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    link_name: Attribute.String;
    page: Attribute.Relation<'components.link', 'oneToOne', 'api::page.page'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'page.feature-block': PageFeatureBlock;
      'layout.header': LayoutHeader;
      'layout.footer-bar': LayoutFooterBar;
      'components.link': ComponentsLink;
    }
  }
}

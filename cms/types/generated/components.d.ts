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

export interface LayoutHeader extends Schema.Component {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'NavLinks';
    description: '';
  };
  attributes: {
    Nav_heading: Attribute.String;
    Footer_link: Attribute.Component<'components.footer-link', true>;
  };
}

export interface LayoutFooterBar extends Schema.Component {
  collectionName: 'components_layout_footer_bars';
  info: {
    displayName: 'footer_bar';
    description: '';
  };
  attributes: {
    External_link: Attribute.Component<'components.link', true>;
  };
}

export interface ComponentsSocialLink extends Schema.Component {
  collectionName: 'components_components_social_links';
  info: {
    displayName: 'SocialLink';
  };
  attributes: {
    Image: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    Url: Attribute.String;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'externalLink';
    description: '';
  };
  attributes: {
    Url_name: Attribute.String;
    url: Attribute.String;
  };
}

export interface ComponentsInternalLink extends Schema.Component {
  collectionName: 'components_components_internal_links';
  info: {
    displayName: 'internalLink';
    description: '';
  };
  attributes: {
    Link_heading: Attribute.String;
    Link: Attribute.Relation<
      'components.internal-link',
      'oneToOne',
      'api::page.page'
    >;
    Description: Attribute.Text;
  };
}

export interface ComponentsFooterLink extends Schema.Component {
  collectionName: 'components_components_footer_links';
  info: {
    displayName: 'FooterLink';
  };
  attributes: {
    Link_name: Attribute.String;
    Page: Attribute.Relation<
      'components.footer-link',
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
      'layout.header': LayoutHeader;
      'layout.footer-bar': LayoutFooterBar;
      'components.social-link': ComponentsSocialLink;
      'components.link': ComponentsLink;
      'components.internal-link': ComponentsInternalLink;
      'components.footer-link': ComponentsFooterLink;
    }
  }
}

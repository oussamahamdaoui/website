import type { ISbComponentType, ISbLinkURLObject } from 'storyblok-js-client'
import type { SbBlokData } from '@storyblok/js/dist/types'

export enum Layout {
  Default = 'default',
  Home = 'home'
}

export enum ButtonVariant {
  Large = 'large',
  LargeBlur = 'largeBlur',
  Small = 'small',
  SmallBlur = 'smallBlur',
  Secondary = 'secondary',
  SecondaryBeige = 'secondaryBeige',
  ArrowLeft = 'arrowLeft',
  PlayButton = 'playButton'
}

export enum Spacing {
  Lg = 'lg',
  Md = 'md',
  Sm = 'sm',
  Xs = 'xs'
}

export enum Gradient {
  Salmon = 'salmon',
  Cyan = 'cyan'
}

export enum LinkType {
  Story = 'story',
  Url = 'url'
}

export enum Typography {
  HeadlineH1 = 'headline-h1',
  HeadlineH2 = 'headline-h2',
  HeadlineH3 = 'headline-h3',
  HeadlineH4 = 'headline-h4',
  HeadlineH5 = 'headline-h5',
  HeadlineH6 = 'headline-h6',
  Secondary1 = 'secondary-1',
  Secondary2 = 'secondary-2',
  Secondary1DaoDao = 'secondary-1-daodao',
  Secondary2DaoDao = 'secondary-2-daodao',
  HighlightLg = 'highlight-lg',
  HighlightMd = 'highlight-md',
  HighlightSm = 'highlight-sm',
}

export interface ISbAsset {
  id: number,
  is_external_url: boolean,
  alt: string,
  name: string,
  focus: string,
  title: string,
  filename: string,
  copyright: string,
  fieldtype: string,
}

export interface ISbMetadata {
  _uid: string,
  title: string,
  plugin: string,
  og_image: string,
  og_title: string,
  description: string,
  twitter_image: string,
  twitter_title: string,
  og_description: string,
  twitter_description: string,
}

export interface ISbLinkObject {
  id: string,
  linktype: LinkType,
  story: ISbLinkURLObject,
  url: string,
  target?: string,
}

export interface IHeaderLogo extends SbBlokData {
  link: ISbLinkObject
  width: string,
  height: string,
}

export interface IHeaderMenu extends SbBlokData {
  link: ISbLinkObject
  text: string,
}

export interface IHeaderMenuSocial extends SbBlokData {
  link: ISbLinkObject
  app: string,
}

export interface ISbConfigData {
  headerLogo: IHeaderLogo[],
  headerMenu: IHeaderMenu[],
  headerMenuSocial: IHeaderMenuSocial[],
  footerMenu: SbBlokData[],
}

export interface ISbLinkApiObject {
  id: number,
  slug: string,
  name: string,
  is_folder: boolean,
  parent_id: number | null,
  published: boolean,
  path: string | null,
  position: number,
  uuid: string,
  is_startpage: boolean,
  real_path: string
}

export enum AppCategory {
  Protocol = 'Protocol',
  Tool = 'Tool',
  NFT = 'NFT',
  DApp = 'Dapp',
  Contract = 'Contract',
  Soon = 'Soon'
}

export interface IAppLinks {
  chrome?: string,
  firefox?: string,
  android?: string,
  ios?: string,
}

export interface IApp {
  id: string,
  icon: string,
  backgroundImage?: string,
  coverImage?: string,
  appPreviews?: Array<string>,
  appLinks?: IAppLinks,
  title: string,
  shortDescription: string,
  longDescription: string,
  category: AppCategory,
  website: string,
  github: string,
  discord: string,
  twitter: string,
  telegram: string,
}

export interface ISbStoryDataContent extends ISbComponentType<string> {
  bgImage: ISbAsset,
  metadata: ISbMetadata,
  layout: Layout,
  body: SbBlokData[]
}

export interface ISbStoryMediumUserContent extends ISbComponentType<string> {
  avatar: ISbAsset,
  username: string,
}

export interface ISbStoryTwitterUserContent extends ISbComponentType<string> {
  avatar: ISbAsset,
  username: string,
  handle: string,
  link: string,
}

export interface ISbStoryYoutubeChannelContent extends ISbComponentType<string> {
  avatar: ISbAsset,
  name: string,
}

export interface IGridLayout {
  fullHeight: boolean | null,
  autoFlow: string | null,
  colsBase: string | null,
  colsSm: string | null,
  colsMd: string | null,
  colsLg: string | null,
  colsXl: string | null,
  cols2xl: string | null,
  rowsBase: string | null,
  rowsSm: string | null,
  rowsMd: string | null,
  rowsLg: string | null,
  rowsXl: string | null,
  rows2xl: string | null,
  gapXAxisBase: string | null,
  gapXAxisSm: string | null,
  gapXAxisMd: string | null,
  gapXAxisLg: string | null,
  gapXAxisXl: string | null,
  gapXAxis2xl: string | null,
  gapYAxisBase: string | null,
  gapYAxisSm: string | null,
  gapYAxisMd: string | null,
  gapYAxisLg: string | null,
  gapYAxisXl: string | null,
  gapYAxis2xl: string | null,
  alignContentBase: string | null,
  alignContentSm: string | null,
  alignContentMd: string | null,
  alignContentLg: string | null,
  alignContentXl: string | null,
  alignContent2xl: string | null,
  placeContentBase: string | null,
  placeContentSm: string | null,
  placeContentMd: string | null,
  placeContentLg: string | null,
  placeContentXl: string | null,
  placeContent2xl: string | null,
  placeItemsBase: string | null,
  placeItemsSm: string | null,
  placeItemsMd: string | null,
  placeItemsLg: string | null,
  placeItemsXl: string | null,
  placeItems2xl: string | null,
  justifyItemsBase: string | null,
  justifyItemsSm: string | null,
  justifyItemsMd: string | null,
  justifyItemsLg: string | null,
  justifyItemsXl: string | null,
  justifyItems2xl: string | null,
}

export interface IGridItemLayout {
  colSpanBase: string | null,
  colSpanSm: string | null,
  colSpanMd: string | null,
  colSpanLg: string | null,
  colSpanXl: string | null,
  colSpan2xl: string | null,
  colStartBase: string | null,
  colStartSm: string | null,
  colStartMd: string | null,
  colStartLg: string | null,
  colStartXl: string | null,
  colStart2xl: string | null,
  colEndBase: string | null,
  colEndSm: string | null,
  colEndMd: string | null,
  colEndLg: string | null,
  colEndXl: string | null,
  colEnd2xl: string | null,
  rowSpanBase: string | null,
  rowSpanSm: string | null,
  rowSpanMd: string | null,
  rowSpanLg: string | null,
  rowSpanXl: string | null,
  rowSpan2xl: string | null,
  rowStartBase: string | null,
  rowStartSm: string | null,
  rowStartMd: string | null,
  rowStartLg: string | null,
  rowStartXl: string | null,
  rowStart2xl: string | null,
  rowEndBase: string | null,
  rowEndSm: string | null,
  rowEndMd: string | null,
  rowEndLg: string | null,
  rowEndXl: string | null,
  rowEnd2xl: string | null,
  justifySelfBase: string | null,
  justifySelfSm: string | null,
  justifySelfMd: string | null,
  justifySelfLg: string | null,
  justifySelfXl: string | null,
  justifySelf2xl: string | null,
  alignSelfBase: string | null,
  alignSelfSm: string | null,
  alignSelfMd: string | null,
  alignSelfLg: string | null,
  alignSelfXl: string | null,
  alignSelf2xl: string | null,
}

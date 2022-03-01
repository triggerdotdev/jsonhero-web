export declare type PreviewImage = {
  url: string;
  contentType: "image" | "gif";
  mimeType: string;
  size?: number;
  image?: ImageAssetDetails;
};

export declare type PreviewVideo = {
  url: string;
  contentType: "video";
  mimeType: string;
  size?: number;
  image?: ImageAssetDetails;
};

export declare type PreviewHtml = {
  url: string;
  contentType: "html";
  mimeType: string;
  title?: string;
  description?: string;
  name?: string;
  icon?: ImageAssetDetails;
  image?: ImageAssetDetails;
  details?: YouTubeLinkDetails | TwitterLinkDetails;
};

export declare type PreviewInfo = PreviewImage | PreviewHtml;
export type PreviewResult = PreviewInfo | { error: string };

declare type YouTubeLinkDetails = {
  type: "youtube";
  videoId: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  publishedAt: string;
};

declare type TwitterLinkDetails = {
  type: "twitter";
  statusId: string;
  retweetCount: number;
  likesCount: number;
  publishedAt: string;
};

declare type ImageAssetDetails = {
  url: string;
  width: number;
  height: number;
};

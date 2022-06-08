import { Body } from "../Primitives/Body";

export function HomeProductHuntBanner() {
  return (
    <div className="flex items-center justify-center w-full px-6 py-3 bg-indigo-600">
      <div className="flex items-center">
        <Body className="mr-3 text-xl text-white">
          We're live on Product Hunt! 👉
        </Body>
        <a
          href="https://www.producthunt.com/posts/json-hero-chrome-extension?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-json&#0045;hero&#0045;chrome&#0045;extension"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=348656&theme=light"
            alt="JSON&#0032;Hero&#0032;Chrome&#0032;extension - A&#0032;beautiful&#0032;JSON&#0032;explorer&#0032;packed&#0032;with&#0032;features | Product Hunt"
            className="h-14"
          />
        </a>
      </div>
    </div>
  );
}

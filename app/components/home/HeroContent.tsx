import DiscordSvg from "~/assets/images/discord-mark-black.svg";
import DiscordMark from "~/components/icons/DiscordMark";
export default function HeroContent() {
  return (
    <>
      <h1 className="text-4xl font-bold text-white">Dying Lotus</h1>
      <h1 className="text-4xl font-bold text-white">Philosophy</h1>
      <p className="text-xl pt-2 text-white text-center">
        A place for philosophy enjoyers to share their ideas and thoughts.
      </p>
      <div className="mt-4 space-y-2">
        <a
          className="text-white justify font-semibold"
          target="_blank"
          href="https://discord.gg/dying-lotus-philosophy-628771278870020096"
          rel="noreferrer"
        >
          <div className="flex flex-col items-center rounded-xl bg-[#5865F2] hover:bg-[#3e48ae] px-4 py-2 text-white">
            <DiscordMark className="w-8 h-8 fill-white" />
            <span>Join on Discord</span>
          </div>
        </a>
      </div>
    </>
  );
}

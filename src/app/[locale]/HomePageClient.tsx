"use client";

import { useState, Suspense, lazy } from "react";
import {
  AlertTriangle,
  Anvil,
  AppWindow,
  ArrowDownToLine,
  ArrowRight,
  BadgeDollarSign,
  Battery,
  BookOpen,
  Boxes,
  Carrot,
  Check,
  ChevronDown,
  CircleDashed,
  Clock,
  Download,
  ExternalLink,
  Eye,
  Flag,
  Flame,
  Gamepad2,
  Gift,
  Globe,
  Hash,
  Infinity,
  Lightbulb,
  Map as MapIcon,
  MonitorSmartphone,
  Move,
  Package,
  Radar,
  Repeat,
  Shuffle,
  Skull,
  Snowflake,
  Sparkles,
  Tag,
  TrendingUp,
  Wind,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

// 模块级标题图标（与 Tools Grid 导航卡片一一对应）
const MODULE_HEADER_ICONS: Record<string, any> = {
  cobbPlayLink: Download,
  cobbBeginnerGuide: BookOpen,
  cobbRulesAndAbilities: Eye,
  cobbItemsFurnaceBreaker: Package,
  cobbStoryAndEnding: Flag,
  cobbEndlessMode: Repeat,
  cobbUpdatesPatchNotes: Clock,
  cobbCodesAndStatus: Gift,
};

// Tools Grid 导航卡片 -> section 锚点（8 张卡对应 8 个模块）
const TOOL_SECTION_IDS = [
  "play-link-download",
  "beginner-guide",
  "rules-and-abilities",
  "items-furnace-breaker",
  "story-and-ending",
  "endless-mode",
  "updates-patch-notes",
  "codes-and-status",
];

// 模块内卡片图标（每个卡片使用不同图标）
const PLAY_LINK_ICONS = [
  Globe,
  Tag,
  AppWindow,
  Download,
  BadgeDollarSign,
  MonitorSmartphone,
  Gamepad2,
  Hash,
];
const RULES_ICONS = [
  Shuffle,
  Radar,
  Eye,
  Wind,
  TrendingUp,
  Move,
  AlertTriangle,
  Lightbulb,
];
const ITEMS_ICONS = [
  Flame,
  CircleDashed,
  Carrot,
  Battery,
  Boxes,
  Anvil,
  Zap,
  ArrowDownToLine,
];
const ENDLESS_ICONS = [Infinity, Shuffle, TrendingUp, Snowflake, MapIcon, Skull];

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cobbcanmove.wiki";

  // 手风琴展开状态
  const [rulesExpanded, setRulesExpanded] = useState<number | null>(0);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Cobb Can Move Wiki",
        description:
          "Complete Cobb Can Move Wiki covering rules, Cobb abilities, coal, furnaces, breakers, endings, updates, and survival tips for the itch.io pixel survival horror game.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Cobb Can Move - Rule-Changing Pixel Survival Horror",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Cobb Can Move Wiki",
        alternateName: "Cobb Can Move",
        url: siteUrl,
        description:
          "Complete Cobb Can Move Wiki resource hub for rules, Cobb abilities, coal, furnaces, breakers, endings, updates, and survival guides",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Cobb Can Move Wiki - Rule-Changing Pixel Survival Horror",
        },
        sameAs: [
          "https://abho.itch.io/cobb-can-move",
          "https://discord.gg/RSHyPB6Cv7",
          "https://twitter.com/aaabho",
          "https://www.youtube.com/watch?v=gcxoAyEnwKM",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Cobb Can Move",
        gamePlatform: ["HTML5", "Windows", "PC"],
        applicationCategory: "Game",
        genre: ["Survival", "Horror", "Pixel Art", "Procedural Generation"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 1,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://abho.itch.io/cobb-can-move",
        },
      },
      {
        "@type": "VideoObject",
        name: "COBB CAN MOVE - Popular Gameplay Video",
        description:
          "Popular Cobb Can Move gameplay video by Markiplier showcasing the rule-changing pixel survival horror.",
        uploadDate: "2026-03-12",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/gcxoAyEnwKM",
        url: "https://www.youtube.com/watch?v=gcxoAyEnwKM",
      },
    ],
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("updates-patch-notes")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <Clock className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://abho.itch.io/cobb-can-move"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 区域（容器上限 max-w-5xl，避免挤压广告位） */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="gcxoAyEnwKM"
              title="COBB CAN MOVE - Popular Gameplay Video"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 模块导航区（8 张卡片对应 8 个 section） */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = TOOL_SECTION_IDS[index];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Cobb Can Move Play Link, Download and Latest Version */}
      <section id="play-link-download" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MODULE_HEADER_ICONS.cobbPlayLink}
            eyebrow={t.modules.cobbPlayLink.eyebrow}
            title={t.modules.cobbPlayLink.title}
            intro={t.modules.cobbPlayLink.intro}
          />
          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.modules.cobbPlayLink.cards.map((card: any, index: number) => {
              const Icon = PLAY_LINK_ICONS[index] || Globe;
              return (
                <div
                  key={index}
                  className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                      <Icon className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                    </span>
                    <h3 className="font-semibold text-sm">{card.name}</h3>
                  </div>
                  <p className="text-[hsl(var(--nav-theme-light))] font-bold text-sm md:text-base mb-1.5 break-words">
                    {card.value}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
          <ExternalCta
            label={t.modules.cobbPlayLink.ctaLabel}
            href={t.modules.cobbPlayLink.ctaHref}
          />
        </div>
      </section>

      {/* 广告位 4: 第一模块之后 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Cobb Can Move Beginner Guide */}
      <section
        id="beginner-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MODULE_HEADER_ICONS.cobbBeginnerGuide}
            eyebrow={t.modules.cobbBeginnerGuide.eyebrow}
            title={t.modules.cobbBeginnerGuide.title}
            intro={t.modules.cobbBeginnerGuide.intro}
          />
          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {t.modules.cobbBeginnerGuide.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <QuickTips tips={t.modules.cobbBeginnerGuide.quickTips} />
        </div>
      </section>

      {/* Module 3: Cobb Can Move Rules and Cobb Abilities */}
      <section id="rules-and-abilities" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MODULE_HEADER_ICONS.cobbRulesAndAbilities}
            eyebrow={t.modules.cobbRulesAndAbilities.eyebrow}
            title={t.modules.cobbRulesAndAbilities.title}
            intro={t.modules.cobbRulesAndAbilities.intro}
          />
          <div className="scroll-reveal space-y-3">
            {t.modules.cobbRulesAndAbilities.items.map((item: any, index: number) => {
              const Icon = RULES_ICONS[index] || Eye;
              const open = rulesExpanded === index;
              return (
                <div
                  key={index}
                  className="border border-border rounded-xl overflow-hidden bg-white/5"
                >
                  <button
                    onClick={() => setRulesExpanded(open ? null : index)}
                    className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                        <Icon className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                      </span>
                      <span className="font-semibold">{item.title}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-sm">
                      <p className="text-muted-foreground mb-3">{item.summary}</p>
                      <ul className="space-y-2">
                        {item.details.map((d: string, di: number) => (
                          <li key={di} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 5: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 4: Cobb Can Move Items, Furnace and Breaker Guide */}
      <section
        id="items-furnace-breaker"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MODULE_HEADER_ICONS.cobbItemsFurnaceBreaker}
            eyebrow={t.modules.cobbItemsFurnaceBreaker.eyebrow}
            title={t.modules.cobbItemsFurnaceBreaker.title}
            intro={t.modules.cobbItemsFurnaceBreaker.intro}
          />
          <div className="scroll-reveal overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-white/5">
                <tr>
                  {t.modules.cobbItemsFurnaceBreaker.columns.map((col: string, ci: number) => (
                    <th
                      key={ci}
                      className="text-left p-3 md:p-4 font-semibold whitespace-nowrap text-[hsl(var(--nav-theme-light))]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.modules.cobbItemsFurnaceBreaker.rows.map((row: any, index: number) => {
                  const Icon = ITEMS_ICONS[index] || Package;
                  return (
                    <tr
                      key={index}
                      className="border-t border-border hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-3 md:p-4 font-semibold align-top">
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                          {row.item}
                        </span>
                      </td>
                      <td className="p-3 md:p-4 align-top">
                        <span className="inline-block text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] whitespace-nowrap">
                          {row.type}
                        </span>
                      </td>
                      <td className="p-3 md:p-4 text-muted-foreground align-top">{row.use}</td>
                      <td className="p-3 md:p-4 text-muted-foreground align-top">{row.note}</td>
                      <td className="p-3 md:p-4 align-top">{row.takeaway}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Module 5: Cobb Can Move Story Mode Levels and Ending */}
      <section id="story-and-ending" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MODULE_HEADER_ICONS.cobbStoryAndEnding}
            eyebrow={t.modules.cobbStoryAndEnding.eyebrow}
            title={t.modules.cobbStoryAndEnding.title}
            intro={t.modules.cobbStoryAndEnding.intro}
          />
          <div className="scroll-reveal relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6 mb-8 md:mb-10">
            {t.modules.cobbStoryAndEnding.steps.map((step: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[1.4rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <h3 className="font-bold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <QuickTips tips={t.modules.cobbStoryAndEnding.quickTips} />
        </div>
      </section>

      {/* Module 6: Cobb Can Move Endless Mode and Replay Strategy */}
      <section
        id="endless-mode"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MODULE_HEADER_ICONS.cobbEndlessMode}
            eyebrow={t.modules.cobbEndlessMode.eyebrow}
            title={t.modules.cobbEndlessMode.title}
            intro={t.modules.cobbEndlessMode.intro}
          />
          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.cobbEndlessMode.cards.map((card: any, index: number) => {
              const Icon = ENDLESS_ICONS[index] || Repeat;
              return (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                      <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    </span>
                    <h3 className="font-bold">{card.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 7: Cobb Can Move Updates and Patch Notes */}
      <section id="updates-patch-notes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MODULE_HEADER_ICONS.cobbUpdatesPatchNotes}
            eyebrow={t.modules.cobbUpdatesPatchNotes.eyebrow}
            title={t.modules.cobbUpdatesPatchNotes.title}
            intro={t.modules.cobbUpdatesPatchNotes.intro}
          />
          <div className="scroll-reveal relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6">
            {t.modules.cobbUpdatesPatchNotes.entries.map((entry: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[1.4rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                      {entry.type}
                    </span>
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{entry.date}</span>
                  </div>
                  <h3 className="font-bold mb-1">{entry.title}</h3>
                  <p className="text-sm text-muted-foreground">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Cobb Can Move Codes, Rewards and Official Status */}
      <section
        id="codes-and-status"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MODULE_HEADER_ICONS.cobbCodesAndStatus}
            eyebrow={t.modules.cobbCodesAndStatus.eyebrow}
            title={t.modules.cobbCodesAndStatus.title}
            intro={t.modules.cobbCodesAndStatus.intro}
          />
          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.cobbCodesAndStatus.cards.map((card: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <h3 className="font-bold text-[hsl(var(--nav-theme-light))] mb-2">
                  {card.name}
                </h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            ))}
          </div>
          <ExternalCta
            label={t.modules.cobbCodesAndStatus.ctaLabel}
            href={t.modules.cobbCodesAndStatus.ctaHref}
          />
        </div>
      </section>

      {/* Latest Updates Section（Tools Grid 之后，符合前半屏顺序要求） */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.gg/RSHyPB6Cv7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/aaabho"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://abho.itch.io/cobb-can-move"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.itchio}
                  </a>
                </li>
                <li>
                  <a
                    href="https://bsky.app/profile/abho.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.bluesky}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- 子组件 ---------- */

function ModuleHeader({
  icon: Icon,
  eyebrow,
  title,
  intro,
}: {
  icon: any;
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="text-center mb-8 md:mb-12 scroll-reveal">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 md:mb-4 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
          <Icon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
          <span className="text-xs md:text-sm font-medium uppercase tracking-wider">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{title}</h2>
      {intro && (
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          {intro}
        </p>
      )}
    </div>
  );
}

function QuickTips({ tips }: { tips: string[] }) {
  return (
    <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
        <h3 className="font-bold text-base md:text-lg">Quick Tips</h3>
      </div>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
            <span className="text-muted-foreground text-sm">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExternalCta({ label, href }: { label: string; href: string }) {
  return (
    <div className="scroll-reveal mt-8 md:mt-10 flex justify-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                   bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                   text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
      >
        {label}
        <ExternalLink className="w-5 h-5" />
      </a>
    </div>
  );
}

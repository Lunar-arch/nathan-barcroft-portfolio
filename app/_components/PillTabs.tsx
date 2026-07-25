import "react";
import { cn } from "@/lib/utils/index";
import { useColorValue } from "@/lib/useColorValue";

export type tabType = {
  title: string;
  active: string;
  onClick: (tab: string) => void;
};

type PillTabsProps = {
  tabs: tabType[];
  bgColor?: string;
  borderColor?: string;
  activeColor?: string;
};

export default function PillTabs({
  tabs,
  bgColor = "bg-white/10",
  borderColor = "border-white/20",
  activeColor = "bg-white/20",
}: PillTabsProps) {
  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.active === tab.title)
  );
  const tabWidth = 100 / tabs.length;

  const { value: bgResolved, swatch: bgSwatch } = useColorValue(bgColor, "background");
  const { value: borderResolved, swatch: borderSwatch } = useColorValue(borderColor, "border");
  const { value: activeResolved, swatch: activeSwatch } = useColorValue(activeColor, "background");

  return (
    <div
      className={cn("flex w-full h-12 px-0.5 py-0.5 border-[0.5px] rounded-full relative")}
      style={{
        backgroundColor: bgResolved,
        borderColor: borderResolved,
      }}
    >
      {bgSwatch}
      {borderSwatch}
      {activeSwatch}
      <label className="sr-only" />
      <span
        className={cn("rounded-full absolute inset-y-0.5 transition-all duration-300 z-10")}
        style={{
          left: `calc(${activeIndex * tabWidth}% + 2px)`,
          width: `calc(${tabWidth}% - 4px)`,
          backgroundColor: activeResolved,
        }}
      />
      {tabs.map((tab, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={tab.title}
            type="button"
            aria-pressed={isActive}
            className={cn(
              "flex-1 rounded-full z-20 px-4 py-2 text-sm font-medium transition-colors",
              isActive ? "text-white" : "text-foreground-secondary hover:text-foreground"
            )}
            onClick={() => tab.onClick(tab.title)}
          >
            {tab.title}
          </button>
        );
      })}
    </div>
  );
}
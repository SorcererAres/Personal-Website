"use client";

import { useLocale } from "next-intl";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  BODY_STATE_CLASSES,
  formatThemeClass,
  THEME_MAX,
  THEME_MIN,
} from "@/lib/site-contracts";

/**
 * 与 legacy script.js 等价的状态机：
 * - themeIndex: 0..16，对应 body.theme--00 .. theme--16；CSS 变量在 color.css 里定义
 * - isLoading / coverVisible: 首屏遮罩时序，3250ms 内移除
 * - mobileNav*: 移动端抽屉双态（visible + transitioning）
 * - themeSliderVisible: 鼠标悬停或触摸时展开 slider
 * - gridOverlayVisible: g/; 键或 grid 按钮触发的 12 列辅助网格
 */

export type ThemeIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

function clamp(n: number) {
  return Math.max(THEME_MIN, Math.min(THEME_MAX, Math.round(n)));
}

interface ThemeState {
  themeIndex: number;
  isLoading: boolean;
  coverVisible: boolean;
  mobileNavVisible: boolean;
  mobileNavTransitioning: boolean;
  themeSliderVisible: boolean;
  gridOverlayVisible: boolean;
}

interface ThemeApi extends ThemeState {
  setThemeIndex: (n: number) => void;
  toggleBlackWhite: () => void;
  cycleSpectrum: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
  setThemeSliderVisible: (v: boolean) => void;
  toggleGridOverlay: () => void;
}

const ThemeCtx = createContext<ThemeApi | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const prevLocaleRef = useRef<string | null>(null);

  const [state, setState] = useState<ThemeState>({
    themeIndex: 16,
    isLoading: true,
    coverVisible: true,
    mobileNavVisible: false,
    mobileNavTransitioning: false,
    themeSliderVisible: false,
    gridOverlayVisible: false,
  });
  const localeCoverTimerRef = useRef<number | null>(null);

  /**
   * 整页加载/刷新：完整首屏（1750ms 收起封面，3250ms 结束 loading）。
   * 禁用「仅跑一次」的 initRef：React Strict Mode 会先 cleanup 定时器再跑第二次 effect，
   * 若第二次直接 return，会永久卡在 cover + loading。
   */
  useEffect(() => {
    let cancelled = false;

    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;

    if (prefersDark) {
      queueMicrotask(() => {
        if (!cancelled) setState((s) => ({ ...s, themeIndex: 0 }));
      });
    }

    const t1 = window.setTimeout(() => {
      if (!cancelled) setState((s) => ({ ...s, coverVisible: false }));
    }, 1750);
    const t2 = window.setTimeout(() => {
      if (!cancelled) setState((s) => ({ ...s, isLoading: false }));
    }, 3250);

    return () => {
      cancelled = true;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  /**
   * 软切换语言：仅重播 Cover。定时器放 ref，避免 effect cleanup 取消计时后
   * 因 prevLocaleRef 已等于当前 locale 而提前 return，导致 cover 永不收起。
   */
  useEffect(() => {
    if (prevLocaleRef.current === null) {
      prevLocaleRef.current = locale;
      return;
    }
    if (prevLocaleRef.current === locale) return;
    prevLocaleRef.current = locale;

    if (localeCoverTimerRef.current) {
      window.clearTimeout(localeCoverTimerRef.current);
      localeCoverTimerRef.current = null;
    }

    queueMicrotask(() => {
      setState((s) => ({ ...s, coverVisible: true }));
    });
    localeCoverTimerRef.current = window.setTimeout(() => {
      setState((s) => ({ ...s, coverVisible: false }));
      localeCoverTimerRef.current = null;
    }, 1750);
  }, [locale]);

  useEffect(() => {
    return () => {
      if (localeCoverTimerRef.current) {
        window.clearTimeout(localeCoverTimerRef.current);
        localeCoverTimerRef.current = null;
      }
    };
  }, []);

  // 把 state 同步到 body class
  useEffect(() => {
    const body = document.body;
    const cls = body.classList;

    // 主题：先清掉所有 theme--XX，再加当前
    Array.from(cls).forEach((c) => {
      if (c.startsWith("theme--")) cls.remove(c);
    });
    cls.add(formatThemeClass(state.themeIndex));

    cls.toggle(BODY_STATE_CLASSES.loading, state.isLoading);
    cls.toggle(BODY_STATE_CLASSES.coverVisible, state.coverVisible);
    cls.toggle(BODY_STATE_CLASSES.mobileNavVisible, state.mobileNavVisible);
    cls.toggle(BODY_STATE_CLASSES.mobileNavTransitioning, state.mobileNavTransitioning);
    cls.toggle(BODY_STATE_CLASSES.themeSliderVisible, state.themeSliderVisible);
  }, [state]);

  // 键盘快捷键
  const setThemeIndex = useCallback(
    (n: number) => setState((s) => ({ ...s, themeIndex: clamp(n) })),
    [],
  );
  const toggleBlackWhite = useCallback(() => {
    setState((s) => ({ ...s, themeIndex: s.themeIndex === 0 ? 16 : 0 }));
  }, []);
  const cycleSpectrum = useCallback(() => {
    setState((s) => ({
      ...s,
      themeIndex: s.themeIndex === THEME_MIN ? THEME_MAX : s.themeIndex - 1,
    }));
  }, []);
  const toggleGridOverlay = useCallback(
    () => setState((s) => ({ ...s, gridOverlayVisible: !s.gridOverlayVisible })),
    [],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // 输入框/可编辑元素中不响应快捷键
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      switch (e.key) {
        case "g":
        case ";":
          toggleGridOverlay();
          break;
        case "w":
        case "b":
          toggleBlackWhite();
          break;
        case "s":
          cycleSpectrum();
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleGridOverlay, toggleBlackWhite, cycleSpectrum]);

  // 移动端 nav
  const openMobileNav = useCallback(() => {
    setState((s) => ({ ...s, mobileNavTransitioning: true }));
    window.setTimeout(
      () => setState((s) => ({ ...s, mobileNavVisible: true })),
      1,
    );
  }, []);
  const closeMobileNav = useCallback(() => {
    setState((s) => ({ ...s, mobileNavVisible: false }));
    window.setTimeout(
      () => setState((s) => ({ ...s, mobileNavTransitioning: false })),
      500,
    );
  }, []);
  const toggleMobileNav = useCallback(() => {
    setState((s) => {
      if (s.mobileNavVisible) {
        // close path：组件外侧的 useEffect 会处理 transitioning 清理
        return { ...s, mobileNavVisible: false };
      }
      return { ...s, mobileNavTransitioning: true };
    });
    // 第二步等下一个 tick
    window.setTimeout(() => {
      setState((s) => {
        if (!s.mobileNavTransitioning) return s; // 已被关掉
        if (s.mobileNavVisible) {
          // 即将关闭：500ms 后清掉 transitioning
          window.setTimeout(
            () => setState((s2) => ({ ...s2, mobileNavTransitioning: false })),
            500,
          );
          return s;
        }
        return { ...s, mobileNavVisible: true };
      });
    }, 1);
  }, []);

  const setThemeSliderVisible = useCallback(
    (v: boolean) => setState((s) => ({ ...s, themeSliderVisible: v })),
    [],
  );

  // window resize 自动收起 mobile nav（与 legacy 行为一致）
  useEffect(() => {
    function onResize() {
      setState((s) =>
        s.mobileNavVisible ? { ...s, mobileNavVisible: false } : s,
      );
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const api = useMemo<ThemeApi>(
    () => ({
      ...state,
      setThemeIndex,
      toggleBlackWhite,
      cycleSpectrum,
      openMobileNav,
      closeMobileNav,
      toggleMobileNav,
      setThemeSliderVisible,
      toggleGridOverlay,
    }),
    [
      state,
      setThemeIndex,
      toggleBlackWhite,
      cycleSpectrum,
      openMobileNav,
      closeMobileNav,
      toggleMobileNav,
      setThemeSliderVisible,
      toggleGridOverlay,
    ],
  );

  return <ThemeCtx.Provider value={api}>{children}</ThemeCtx.Provider>;
}

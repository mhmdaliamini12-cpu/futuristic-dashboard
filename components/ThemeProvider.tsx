'use client';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, accentColor, setTheme, setAccentColor } = useThemeStore();
  const { locale, setLocale } = useLanguageStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--accent', accentColor);
    document.documentElement.dir = locale === 'fa' || locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    const fontFamily = locale === 'fa' ? 'Vazirmatn' :
                      locale === 'ar' ? 'Cairo' : 'Inter';
    document.documentElement.style.fontFamily = fontFamily;
  }, [theme, accentColor, locale]);

  return <>{children}</>;
}
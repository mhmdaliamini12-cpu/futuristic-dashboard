'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { useLanguageStore } from '@/store/useLanguageStore';
import { useThemeStore } from '@/store/useThemeStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGlobe,
  FiSettings,
  FiSun,
  FiMoon,
  FiGrid,
  FiList,
  FiMinimize2
} from 'react-icons/fi';
import { MdOutlineDashboard, MdAnalytics, MdPerson } from 'react-icons/md';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const { locale, setLocale } = useLanguageStore();
  const { theme } = useThemeStore();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const changeLanguage = (langCode: string) => {
    setLocale(langCode);
    router.push(pathname, { locale: langCode });
    setIsLangOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 ${
        theme === 'glassmorphism' ? 'glass-effect' : 'bg-[rgb(var(--bg-secondary))]'
      } border-b border-[rgb(var(--border-color))] shadow-lg`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center space-x-2 rtl:space-x-reverse"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-[rgb(var(--accent))] rounded-lg animate-neon-pulse"></div>
            <span className="font-orbitron text-xl font-bold bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-glow))] bg-clip-text text-transparent">
              Futurify
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <NavLink href="/dashboard" icon={<MdOutlineDashboard />} text={t('dashboard')} />
            <NavLink href="/analytics" icon={<MdAnalytics />} text={t('analytics')} />
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 rounded-lg hover:bg-[rgb(var(--accent))]/10 transition-all"
              >
                <FiGlobe className="w-5 h-5" />
              </motion.button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-color))] overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full px-4 py-2 text-left hover:bg-[rgb(var(--accent))]/10 transition-colors flex items-center space-x-2 rtl:space-x-reverse ${
                          locale === lang.code ? 'bg-[rgb(var(--accent))]/20' : ''
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                        {locale === lang.code && (
                          <motion.div
                            layoutId="activeLang"
                            className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--accent))]"
                          />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/${locale}/settings`)}
              className="p-2 rounded-lg hover:bg-[rgb(var(--accent))]/10 transition-all"
            >
              <FiSettings className="w-5 h-5" />
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-glow))] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={() => router.push(href)}
      className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg transition-all ${
        isActive
          ? 'text-[rgb(var(--accent))] bg-[rgb(var(--accent))]/10'
          : 'hover:text-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))]/5'
      }`}
    >
      {icon}
      <span>{text}</span>
    </motion.button>
  );
}
import {
  render as rtlRender,
  RenderOptions,
  screen,
  waitFor,
  within,
  fireEvent,
  act,
} from '@testing-library/react';
import { ReactElement } from 'react';

import { LanguageProvider } from '../context/LanguageContext';

function AllProviders({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return rtlRender(ui, { wrapper: AllProviders, ...options });
}

export { customRender as render, screen, waitFor, within, fireEvent, act };

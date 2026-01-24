import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { LanguageProvider } from '../context/LanguageContext';

function AllProviders({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };

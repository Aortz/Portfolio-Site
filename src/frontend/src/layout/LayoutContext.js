import { createContext, useContext } from 'react';

/* `docked` = section is rendering inside the SectionDock panel (world mode)
   rather than as a full-height block in the vertical page. Sections use it to
   drop min-height/border/accent-slot styling and skip scroll-triggered
   fade-ins. */
export const LayoutContext = createContext({ docked: false });

export const useLayout = () => useContext(LayoutContext);

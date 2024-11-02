import { createGlobalStyle } from 'styled-components';
import VT323RegularTTF from '../../assets/fonts/VT323/VT323-Regular.ttf';
import MoiraiOne from '../../assets/fonts/MoiraiOne/MoiraiOne-Regular.ttf';import IBMPlexMonoBold from '../../assets/fonts/IBM_Plex_Mono/IBMPlexMono-Bold.ttf';
import MajorMonoDisplay from '../../assets/fonts/Major_Mono_Display/MajorMonoDisplay-Regular.ttf';
import PressStart2P from '../../assets/fonts/Press_Start_2P/PressStart2P-Regular.ttf';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'VT323';
    src: url(${VT323RegularTTF}) format('truetype');
    /* You can specify additional font styles here if needed, such as font-weight and font-style */
  }

  @font-face {
    font-family: 'PressStart2P';
    src: url(${PressStart2P}) format('truetype');
    /* You can specify additional font styles here if needed, such as font-weight and font-style */
  }

  @font-face {
    font-family: 'MoiraiOne';
    src: url(${MoiraiOne}) format('truetype');
    /* You can specify additional font styles here if needed, such as font-weight and font-style */
  }

  @font-face {
    font-family: 'MajorMonoDisplay';
    src: url(${MajorMonoDisplay}) format('truetype');
    /* You can specify additional font styles here if needed, such as font-weight and font-style */
  }
  @font-face {
    font-family: 'IBMPlexMonoBold';
    src: url(${IBMPlexMonoBold}) format('truetype');
    /* You can specify additional font styles here if needed, such as font-weight and font-style */
  }

  body {
    margin: 0;
    padding: 0;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    
    &::-webkit-scrollbar {
      display: none;  /* Chrome, Safari and Opera */
    }
  }

`;

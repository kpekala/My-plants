import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'myplants.cloud',
  },
  palette: {
    popup: {
      background: '#14C38E',
    },
    button: {
      background: '#E3FCBF',
    },
  },
  theme: 'edgeless',
  type: 'opt-out',
};

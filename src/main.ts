import * as rtl from 'rtl-css-js';

const convert = rtl['default'] || rtl;

export interface JssRTLOptions {
  enabled?: boolean;
  opt?: 'in' | 'out';
}

export default function jssRTL({ enabled = true, opt = 'out' }: JssRTLOptions = {}) {
  return {
    onProcessStyle(style: any, rule: any, sheet: any) {
      if (rule.type === 'font-face') {
        return style;
      }

      if (!enabled) {
        if (typeof style.flip === 'boolean') {
          delete style.flip;
        }

        return style;
      }

      let flip = opt === 'out'; // If it's set to opt-out, then it should flip by default

      if (typeof sheet.options.flip === 'boolean') {
        flip = sheet.options.flip;
      }

      if (typeof style.flip === 'boolean') {
        flip = style.flip;
        delete style.flip;
      }

      if (!flip) {
        return style;
      }

      return convert(typeof rule.toJSON === 'function' ? rule.toJSON() : style);
    },
  };
}

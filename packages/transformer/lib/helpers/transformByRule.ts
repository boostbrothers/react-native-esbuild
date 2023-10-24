import { transformWithBabel, transformWithSwc } from '../transform';
import type {
  TransformRuleBase,
  TransformerContext,
  SwcTransformRule,
  BabelTransformRule,
} from '../types';

const getOptions = <T>(
  options: TransformRuleBase<T>['options'],
  code: string,
  context: TransformerContext,
): T => {
  return options instanceof Function ? options(context.path, code) : options;
};

export const transformBySwcRule = (
  rule: SwcTransformRule,
  code: string,
  context: TransformerContext,
): Promise<string | null> => {
  return rule.test(context.path, code)
    ? transformWithSwc(code, context, {
        customOptions: getOptions(rule.options, code, context),
      })
    : Promise.resolve(null);
};

export const transformByBabelRule = (
  rule: BabelTransformRule,
  code: string,
  context: TransformerContext,
): Promise<string | null> => {
  return rule.test(context.path, code)
    ? transformWithBabel(code, context, {
        customOptions: getOptions(rule.options, code, context),
      })
    : Promise.resolve(null);
};

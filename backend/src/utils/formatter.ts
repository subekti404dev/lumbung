/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import YAML from "json-to-pretty-yaml";
// @ts-ignore
import json2toml from "json2toml";

export default {
  yaml: (data: any) => {
    return YAML.stringify(data);
  },
  toml: (data: any) => {
    return json2toml(data, { simple: true });
  },
  dotenv: (data: any) => {
    const flattenObject = (
      o: any,
      prefix = "",
      result: any = {},
      keepNull = true
    ) => {
      if (
        _.isString(o) ||
        _.isNumber(o) ||
        _.isBoolean(o) ||
        (keepNull && _.isNull(o))
      ) {
        result[prefix] = o;
        return result;
      }

      if (_.isArray(o) || _.isPlainObject(o)) {
        for (const i in o) {
          let pref = prefix;
          if (_.isArray(o)) {
            pref = pref + `__${i}`;
          } else {
            if (_.isEmpty(prefix)) {
              pref = i;
            } else {
              pref = prefix + "__" + i;
            }
          }
          flattenObject(o[i], pref, result, keepNull);
        }
        return result;
      }
      return result;
    };
    const str = json2toml(flattenObject(data), { simple: true });
    return str
      .split("\n")
      .map((line: string) => {
        const [key, value] = line.split(" = ");
        return [
          key,
          value && value.startsWith(`"`) && value.endsWith(`"`)
            ? value?.slice(1, -1)
            : value,
        ].join("=");
      })
      .join("\n");
  },
};

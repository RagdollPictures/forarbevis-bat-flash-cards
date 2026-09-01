import type {
    ConfigContext,
    ExpoConfig,
} from "expo/config";

import {
    appVariants,
} from "./config/appVariants";

export default ({
  config,
}: ConfigContext): ExpoConfig => {
  const requestedVariant =
    process.env
      .EXPO_PUBLIC_APP_VARIANT ??
    "forarbevis";

  if (
    !(
      requestedVariant in
      appVariants
    )
  ) {
    throw new Error(
      `Okänd appvariant: ${requestedVariant}`
    );
  }

  const variantName =
    requestedVariant as keyof typeof appVariants;

  const variant =
    appVariants[variantName];

  return {
    ...config,

    name: variant.appName,
    slug: variant.slug,
    scheme: variant.scheme,
    icon: variant.icon,

    ios: {
      ...config.ios,

      bundleIdentifier:
        variant.iosBundleIdentifier,
    },

    android: {
      ...config.android,

      package:
        variant.androidPackage,

      adaptiveIcon: {
        ...config.android
          ?.adaptiveIcon,

        foregroundImage:
          variant.androidIconForeground,

        backgroundImage:
          variant.androidIconBackground,

        monochromeImage:
          variant.androidIconMonochrome,
      },
    },

    web: {
      ...config.web,

      favicon:
        variant.favicon,
    },

    plugins: [
      "expo-router",

      [
        "expo-splash-screen",
        {
          image:
            variant.splashIcon,

          imageWidth: 200,

          resizeMode:
            "contain",

          backgroundColor:
            "#ffffff",

          dark: {
            backgroundColor:
              "#000000",
          },
        },
      ],

      "expo-font",
      "expo-web-browser",
    ],

    extra: {
      ...config.extra,

      router:
        config.extra?.router ??
        {},

      appVariant:
        variantName,

      course:
        variant.course,

      eas: {
        projectId:
          variant.easProjectId,
      },
    },
  };
};
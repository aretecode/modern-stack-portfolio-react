# Google Tag Manager (GTM)

> React & deps to use GoogleTagManager

## Internal
- [#57 - Add Google Tag Manager](https://github.com/aretecode/modern-stack-web-portfolio/issues/57)

## Learn More
- [google's quickstart guide](https://developers.google.com/tag-manager/quickstart)
- [google's dev guide](https://developers.google.com/tag-manager/devguide)
- [optimization with requestIdleCallback](https://developers.google.com/web/updates/2015/08/using-requestidlecallback#using_requestidlecallback_for_sending_analytics_data)
- [gtm with amp](https://support.google.com/tagmanager/answer/9205783)
- [gtm setup & install](https://support.google.com/tagmanager/answer/6103696?hl=en)
- [related but unused react gtm](https://github.com/holidaycheck/react-google-tag-manager)
- [debug gtm integration](https://www.analyticsmania.com/post/how-to-check-if-google-tag-manager-is-working/)


```tsx
    // const dataLayerName = 'dataLayer'
    // const previewVariables = false
    // const additionalEvents = ''
    // const scriptBody = `
    //   (function(w,d,s,l,i){w[l]=w[l]||[];
    //     w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js', ${additionalEvents}});
    //     var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    //     j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl${
    //       previewVariables !== false ? `+"${previewVariables}"` : ''
    //     };
    //     f.parentNode.insertBefore(j,f);
    //   })(window,document,'script','${dataLayerName}','${GOOGLE_TAG_MANAGER_WEB_ID}');`.replace(
    //   /[\n\s]+/gm,
    //   ' '
    // )
```

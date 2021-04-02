# Salesforce Marketing Cloud Integration [SMC]

This project is a [Block Widget](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/content-sdk.htm) for SMC's Content Builder.

A Block Widget is a simple web-hosted application iframed inside Content Builder, that use *Content Builder Block SDK*. The Content Builder SDK is a cross-document wrapper, which lets your custom block’s HTML page update the content block within the app in real time. (behind the scene it uses  [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMesage) browser's API)

This app enable direct access to Reelevant's generated blocks inside SMC.

## Design UX/UI

Apart from shared components, this app conforms to **Ligthning Design Principles** from Salesforce. https://react.lightningdesignsystem.com/

### Notes
- `jest-canvas-mock` have to be imported before testing (https://github.com/salesforce/design-system-react/issues/1717)
- We have added a CSS rule to force `Salesforce Sans`


## Links
- https://www.salesforce.com/eu/products/marketing-cloud/platform/ 
- [Movable Ink Integration on AppExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000EuHRuUAN)
- https://developer.salesforce.com/developer-centers/marketing-cloud/
- [ISVforce guide](https://developer.salesforce.com/docs/atlas.en-us.packagingGuide.meta/packagingGuide)
- [trailhead: Content Builder Block SDK](https://trailhead.salesforce.com/fr/content/learn/modules/content-builder-block-sdk?trail_id=develop-for-marketing-cloud)
- [Youtube: The Content Block SDK and the Marketing Cloud SDK Playground](https://www.youtube.com/watch?v=eJ74dxJ_JSo)


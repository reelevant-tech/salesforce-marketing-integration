# Salesforce Marketing Cloud Integration [SMC] - Reelevant

This project is a [Block Widget](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/content-sdk.htm) for SMC's Content Builder.

A Block Widget is a simple web-hosted application iframed inside Content Builder, that use *Content Builder Block SDK*. The Content Builder SDK is a cross-document wrapper, which lets your custom block’s HTML page update the content block within the app in real time. (behind the scene it uses  [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMesage) browser's API)

This app enable direct access to Reelevant's generated blocks inside SMC.

## Usage

### Production

Since the current authentication system use a `cross_site` authentication (you need to log within `https://app.reelevant.com` to access blocks within the widget) and to avoid CSRF we whitelist with CORS the URL of where this widget is hosted, which is currently: `https://smc.reelevant.com`.
If you want to host your own instance, you'll need to communicate URL of your instance so we can whitelist it.

### Development

The easiest way to debug this widget is to use the [blocktester](https://blocktester.herokuapp.com/) app ([docs](https://trailhead.salesforce.com/fr/content/learn/modules/content-builder-block-sdk/test-and-deploy-a-block?trail_id=develop-for-marketing-cloud)):
- Run `yarn start`
- Go to [blocktester](https://blocktester.herokuapp.com/) app
- Enter `http://localhost:8083` as the widget URL
- Click on a "block" zone at the right to load the widget.
- The widget UI will appears on the left, right zones represent what will be rendered within SMC.

## Notes

Apart from shared components, this app conforms to [**Ligthning Design Principles**](https://react.lightningdesignsystem.com/) from Salesforce. We have also added a CSS rule to force `Salesforce Sans`

## Documentation links
- https://www.salesforce.com/eu/products/marketing-cloud/platform/ 
- https://developer.salesforce.com/developer-centers/marketing-cloud/
- [ISVforce guide](https://developer.salesforce.com/docs/atlas.en-us.packagingGuide.meta/packagingGuide)
- [trailhead: Content Builder Block SDK](https://trailhead.salesforce.com/fr/content/learn/modules/content-builder-block-sdk?trail_id=develop-for-marketing-cloud)
- [Youtube: The Content Block SDK and the Marketing Cloud SDK Playground](https://www.youtube.com/watch?v=eJ74dxJ_JSo)


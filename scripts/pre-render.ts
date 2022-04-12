const { join } = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const Prerenderer = require("@prerenderer/prerenderer");
// Make sure you install a renderer as well!
const JSDOMRenderer = require("@prerenderer/renderer-jsdom");

const prerenderer = new Prerenderer({
    outputDir: join(process.cwd(), "./dist"),
    // Required - The path to the app to prerender. Should have an index.html and any other needed assets.
    staticDir: join(process.cwd(), "./dist"),
    // The plugin that actually renders the page.
    renderer: new JSDOMRenderer({
        maxConcurrentRoutes: 4,
        renderAfterElementExists: ".section",
        headless: true
    })
});

// Initialize is separate from the constructor for flexibility of integration with build systems.
prerenderer
    .initialize()
    .then(() => {
        // List of routes to render.
        return prerenderer.renderRoutes([
            '/',
            '/api/start',
            '/api/strategy',
            '/api/service',
            '/contribution',
            '/contacts'
        ]);
    })
    .then((renderedRoutes) => {
        // renderedRoutes is an array of objects in the format:
        // {
        //   route: String (The route rendered)
        //   html: String (The resulting HTML)
        // }
        renderedRoutes.forEach((renderedRoute) => {
            try {
                // A smarter implementation would be required, but this does okay for an example.
                // Don't copy this directly!!!
                const outputDir = join(process.cwd(), "dist", renderedRoute.route);
                const outputFile = `${outputDir}/index.html`;

                mkdirp.sync(outputDir);
                fs.writeFileSync(outputFile, renderedRoute.html.trim());
            } catch (e) {
                // Handle errors.
            }
        });

        // Shut down the file server and renderer.
        prerenderer.destroy();
    })
    .catch((err) => {
        // Shut down the server and renderer.
        prerenderer.destroy();
        // Handle errors.
        console.error(err);
    });

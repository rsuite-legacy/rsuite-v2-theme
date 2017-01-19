const colors = {
    "default": "#00bcd4",
    "pagurian": "#1b9451"
};

module.exports = {
    "palette": [
        {
            colors,
            "output": "dist/test/css/",
        },
        {
            colors,
            "prev": "loading-",
            "output": "dist/test/css/",
            "src": "css/loading.min.css"
        }
    ],
    "resources": {
        paths: [
            'fonts/**/*.*'
        ],
        dist: 'dist/test'
    }
};

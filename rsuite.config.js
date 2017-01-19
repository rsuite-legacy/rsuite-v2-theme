const colors = {
    "default": "#dddd",
    "hypers": "#f5f5f5"
};

module.exports = {
    "palette": [
        {
            colors,
            "output": "dist/test/css/",
            "src": "css/rsuite.min.css"
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
